import { useState } from 'react';
import {
  type LoaderFunctionArgs,
  redirect,
  type RouterContextProvider,
  useNavigate,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { Button, Container, Tabs } from '@plone/components/quanta';
import ChevronRight from '@plone/components/icons/chevron-right.svg?react';
import { Plug } from '@plone/layout/components/Pluggable';
import Back from '@plone/components/icons/arrow-left.svg?react';
import config from '@plone/registry';
// eslint-disable-next-line import/no-unresolved
import slotTree from 'seven/.plone/registry.slottree.json';
import { ploneContentContext } from 'seven/app/middleware.server';
import { requireAuthCookie } from '@plone/react-router';

// { slotId: { componentName: [childSlotId, ...] } }
type SlotTreeMap = Record<string, Record<string, string[]>>;

interface SlotNodeProps {
  slotId: string;
  tree: SlotTreeMap;
  depth: number;
}

interface ComponentNodeProps {
  name: string;
  childSlots: string[];
  tree: SlotTreeMap;
  depth: number;
}

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const content = context.get(ploneContentContext);
  const userActions = content['@components']?.actions?.user ?? [];

  const isManager = userActions.find((action) => action.id === 'plone_setup');

  if (!isManager) {
    return redirect('/login');
  }
}

function ComponentNode({ name, childSlots, tree, depth }: ComponentNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLeaf = childSlots.length === 0;

  return (
    <div className="border-t border-border">
      <button
        type="button"
        className="flex w-full items-center gap-3 py-3 pr-4 text-left"
        style={{ paddingLeft: `${(depth + 1) * 16}px` }}
        onClick={() => !isLeaf && setIsOpen((o) => !o)}
      >
        <ChevronRight
          className={clsx(
            'size-4 shrink-0 transition-transform duration-200',
            isLeaf ? 'invisible' : 'text-muted-fg',
            isOpen && 'rotate-90',
          )}
        />
        <span className="font-bold">
          {name}
          {!isLeaf && (
            <span className="text-muted-fg font-normal">
              {' '}
              ({childSlots.length})
            </span>
          )}
        </span>
      </button>
      {isOpen && (
        <div>
          {childSlots.map((slotId) => (
            <SlotNode
              key={slotId}
              slotId={slotId}
              tree={tree}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SlotNode({ slotId, tree, depth }: SlotNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const registeredComponents = config.slots[slotId]?.slots ?? [];
  const componentChildMap = tree[slotId] ?? {};
  const isLeaf = registeredComponents.length === 0;

  return (
    <div className={depth > 0 ? 'border-t border-border' : ''}>
      <button
        type="button"
        className="flex w-full items-center gap-3 py-3 pr-4 text-left"
        style={{ paddingLeft: `${(depth + 1) * 16}px` }}
        onClick={() => !isLeaf && setIsOpen((o) => !o)}
      >
        <ChevronRight
          className={clsx(
            'size-4 shrink-0 transition-transform duration-200',
            isLeaf ? 'invisible' : 'text-muted-fg',
            isOpen && 'rotate-90',
          )}
        />
        <span>
          {slotId}{' '}
          <span className="text-muted-fg">({registeredComponents.length})</span>
        </span>
      </button>
      {isOpen && (
        <div>
          {registeredComponents.map((name) => (
            <ComponentNode
              key={name}
              name={name}
              childSlots={componentChildMap[name] ?? []}
              tree={tree}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RegisteredSlotCard({ slotId }: { slotId: string }) {
  const components = config.slots[slotId]?.slots ?? [];

  return (
    <div className="rounded-lg border border-border px-4 py-3">
      <div className="flex items-baseline gap-2">
        <span className="font-bold">{slotId}</span>
        <span className="text-muted-fg text-sm">({components.length})</span>
      </div>
      {components.length > 0 && (
        <div className="text-muted-fg mt-1 text-sm">
          {components.join(' · ')}
        </div>
      )}
    </div>
  );
}

function SlotList({ slotIds, tree }: { slotIds: string[]; tree: SlotTreeMap }) {
  return (
    <div className="flex flex-col gap-3">
      {slotIds.map((slotId) => (
        <div
          key={slotId}
          className="overflow-hidden rounded-lg border border-border"
        >
          <SlotNode slotId={slotId} tree={tree} depth={0} />
        </div>
      ))}
    </div>
  );
}

function RegisteredSlotList({ slotIds }: { slotIds: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {slotIds.map((slotId) => (
        <RegisteredSlotCard key={slotId} slotId={slotId} />
      ))}
    </div>
  );
}

export default function SlotsView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tree = slotTree as SlotTreeMap;

  const allChildren = new Set(
    Object.values(tree).flatMap((componentMap) =>
      Object.values(componentMap).flat(),
    ),
  );

  const registeredSlots = Object.keys(config.slots).sort((a, b) =>
    a.localeCompare(b),
  );
  const rootSlots = registeredSlots.filter((s) => !allChildren.has(s));

  return (
    <main>
      <Plug pluggable="toolbar-top" id="button-back">
        <Button aria-label="back" size="L" onPress={() => navigate('/')}>
          <Back />
        </Button>
      </Plug>
      <Container width="default" className="py-8">
        <h1 className="mb-4 text-4xl font-bold">
          {t('cmsui.views.slots.heading')}
        </h1>
        <Tabs
          tabs={[
            {
              id: 'registered',
              title: t('cmsui.views.slots.registeredTab'),
              content: (
                <>
                  <p className="text-muted-fg mb-4 text-sm">
                    {t('cmsui.views.slots.registeredDescription')}
                  </p>
                  <RegisteredSlotList slotIds={registeredSlots} />
                </>
              ),
            },
            {
              id: 'composition',
              title: t('cmsui.views.slots.compositionTab'),
              content: (
                <>
                  <p className="text-muted-fg mb-4 text-sm">
                    {t('cmsui.views.slots.compositionDescription')}
                  </p>
                  <SlotList slotIds={rootSlots} tree={tree} />
                </>
              ),
            },
          ]}
        />
      </Container>
    </main>
  );
}
