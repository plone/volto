import fs from 'fs';
import path from 'path';

// Uses the Vite module graph rather than file scanning so only truly-loaded
// modules are included and addons in node_modules are covered naturally.
async function findSlotRendererImporters(server) {
  const resolved = await server.pluginContainer.resolveId(
    '@plone/layout/slots/SlotRenderer',
    undefined,
    { ssr: true },
  );
  if (!resolved) return [];

  const mod = server.moduleGraph.getModuleById(resolved.id);
  if (!mod) return [];

  return [...mod.importers].filter((m) => m.file);
}

// Uses client-side (non-SSR) transforms so "SlotRenderer" stays visible as a
// named binding in the compiled output, letting the pattern anchor on it and
// avoid false positives from unrelated `name` props.
async function findReferencedSlotNames(server) {
  const importers = await findSlotRendererImporters(server);
  const names = new Set();
  const pattern =
    /\w+\s*\(\s*SlotRenderer\s*,\s*\{[^{]*\bname\s*:\s*["']([^"']+)["']/g;

  for (const mod of importers) {
    try {
      const result = await server.transformRequest(mod.url);
      if (!result?.code) continue;
      for (const match of result.code.matchAll(pattern)) {
        names.add(match[1]);
      }
    } catch {
      // ignore modules that fail to transform
    }
  }

  return names;
}

// The SSR transform renames import bindings, so component.toString() no longer
// mentions "SlotRenderer" by name — but JSX always emits name: "foo" as an
// object property, which this pattern matches reliably.
function childSlotsOf(component, allKnownSlots, parentSlotId) {
  let source;
  try {
    source = component.toString();
  } catch {
    return [];
  }
  return [...source.matchAll(/name\s*:\s*["']([^"']+)["']/g)]
    .map(([, name]) => name)
    .filter((name) => allKnownSlots.has(name) && name !== parentSlotId);
}

function buildChildrenMap(slots, allKnownSlots) {
  const childrenOf = {};
  for (const [slotId, slotManager] of Object.entries(slots)) {
    for (const componentName of slotManager.slots) {
      const children = new Set(
        (slotManager.data[componentName] ?? []).flatMap(({ component }) =>
          childSlotsOf(component, allKnownSlots, slotId),
        ),
      );
      if (children.size > 0) {
        childrenOf[slotId] ??= {};
        childrenOf[slotId][componentName] = [...children];
      }
    }
  }
  return childrenOf;
}

export async function buildSlotTree(config, ploneDir, server) {
  const referencedSlotNames = await findReferencedSlotNames(server);
  const allKnownSlots = new Set([
    ...Object.keys(config.slots),
    ...referencedSlotNames,
  ]);
  const childrenOf = buildChildrenMap(config.slots, allKnownSlots);

  fs.writeFileSync(
    path.join(ploneDir, 'registry.slottree.json'),
    JSON.stringify(childrenOf, null, 2),
  );
}
