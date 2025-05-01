import { useTranslation } from 'react-i18next';
import {
  redirect,
  useFetcher,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import { requireAuthCookie } from './auth/auth';
import { mergeForm, useTransform } from '@tanstack/react-form';
import type { DeepKeys } from '@tanstack/react-form';

import {
  ServerValidateError,
  createServerValidate,
  formOptions,
  initialFormState,
} from '@tanstack/react-form/remix';
import { atom, useAtom, useSetAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { useHydrateAtoms } from 'jotai/utils';
import { useCallback, useMemo, useRef } from 'react';
import type { PrimitiveAtom, WritableAtom } from 'jotai';
import type { ReactNode } from 'react';
import type { Content } from '@plone/types';
import type { OpticFor } from 'optics-ts';
import { Plug } from '../components/Pluggable';
import Checkbox from '@plone/components/icons/checkbox.svg?react';

import { useAppForm } from '../components/Form/Form';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
  Button,
} from '@plone/components/tailwind';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { PlateEditor } from '@plone/plate/components/editor/plate-editor';
import { blocksToPlate as blocksToPlateNew } from '@plone/plate/helpers/conversions';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const { data: content } = await cli.getContent({ path });
  const { data: schema } = await cli.getType({ contentType: content['@type'] });

  return { content, schema };
}

export async function action({ params, request }: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const formData = await request.json();

  await cli.updateContent({
    path,
    data: formData,
  });

  return redirect(path);
}

const formAtom = atom<Content>();

const HydrateAtoms = ({
  atomValues,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atomValues: Iterable<
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: ReactNode;
}) => {
  // initialising on state with prop on render here
  useHydrateAtoms(new Map(atomValues));
  return children;
};

const useTitleAtom = ({ formAtom, field }) => {
  return useMemo(() => {
    return focusAtom(formAtom, (optic) => optic.prop(field));
  }, [formAtom, field]);
};

const ConsoleLog = ({ atom }: { atom: PrimitiveAtom<Content> }) => {
  const titleAtom = useTitleAtom({ formAtom: atom, field: 'title' });
  const [title] = useAtom(titleAtom);
  const [formData, setFormData] = useAtom(atom);

  return (
    <div className="mt-4">
      <pre>
        Global form data main JOTAI atom{' '}
        {JSON.stringify(formData.title, null, 2)}
      </pre>
      <pre>
        Focused atom GETTER on title key {JSON.stringify(title, null, 2)}
      </pre>
    </div>
  );
};

export function useFocusAtom<T>({
  anAtom,
  field,
}: {
  anAtom: PrimitiveAtom<T>;
  field: DeepKeys<T>;
}) {
  return useSetAtom(
    focusAtom(
      anAtom,
      // @ts-ignore
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}

function blocksToPlate({
  blocks,
  blocks_layout,
}: {
  blocks: BlocksData['blocks'];
  blocks_layout: BlocksData['blocks_layout'];
}) {
  const plateChildren = blocks_layout.items.map((blockId) => {
    const block = blocks[blockId];

    if (block['@type'] === 'slate') {
      return {
        type: 'p',
        children: [block.value[0]],
        ...block,
      };
    } else if (block['@type'] === 'title') {
      return {
        type: 'title',
        children: [
          {
            text: 'The title',
          },
        ],
        ...block,
      };
    }
  });

  return plateChildren.filter((block) => block !== undefined);
}

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const fetcher = useFetcher();

  const form = useAppForm({
    defaultValues: content,
    onSubmit: async ({ value }) => {
      console.log('submit', value);
      // fetcher.submit(value, {
      //   method: 'post',
      //   encType: 'application/json',
      // });

      // return redirect(`/${content['@id']}`);
    },
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false }, [Fade()]);
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ watchDrag: false }, [
    Fade(),
  ]);
  console.log(
    'blocksToPlateOriginal',
    blocksToPlate({
      blocks: content.blocks,
      blocks_layout: content.blocks_layout,
      content,
    }),
  );
  console.log('blocksToPlateNew', blocksToPlateNew(content));

  return (
    <HydrateAtoms atomValues={[[formAtom, content]]}>
      <main className="mx-4 mt-8 flex h-screen flex-1 flex-col">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              <div className="embla__slide">
                <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-lg">
                  <h1 className="mb-4 text-2xl font-bold">
                    {content.title} - {t('cmsui.edit')}
                  </h1>
                  <form
                  // onSubmit={(e) => {
                  //   debugger;
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  //   form.handleSubmit();
                  // }}
                  // ref={formRef}
                  >
                    {schema.fieldsets.map((fieldset) => (
                      <Accordion
                        defaultExpandedKeys={['default']}
                        key={fieldset.id}
                      >
                        <AccordionItem id={fieldset.id} key={fieldset.id}>
                          <AccordionItemTrigger>
                            {fieldset.title}
                          </AccordionItemTrigger>
                          <AccordionPanel>
                            {(fieldset.fields as DeepKeys<Content>[]).map(
                              (schemaField, index) => (
                                <form.AppField
                                  name={schemaField}
                                  key={index}
                                  // eslint-disable-next-line react/no-children-prop
                                  children={(field) => (
                                    <field.Quanta
                                      {...schema.properties[schemaField]}
                                      className="mb-4"
                                      label={
                                        schema.properties[field.name].title
                                      }
                                      name={field.name}
                                      defaultValue={field.state.value}
                                      required={
                                        schema.required.indexOf(schemaField) !==
                                        -1
                                      }
                                      error={field.state.meta.errors}
                                      formAtom={formAtom}
                                    />
                                  )}
                                />
                              ),
                            )}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    ))}
                    <Plug pluggable="toolbar" id="edit-save-button">
                      <Button
                        aria-label={t('cmsui.save')}
                        type="submit"
                        // onPress={() => formRef.current?.submit()}
                        onPress={() => form.handleSubmit()}
                        variant="primary"
                        accent
                        size="L"
                      >
                        <Checkbox />
                      </Button>
                    </Plug>
                  </form>
                  <Plug
                    pluggable="navtoolbar-buttons"
                    id="form-slides"
                    dependencies={[emblaApi]}
                  >
                    <div>
                      <Button
                        className="mr-4"
                        onPress={() => {
                          emblaApi?.scrollTo(0);
                        }}
                      >
                        Metadata
                      </Button>
                      <Button onPress={() => emblaApi?.scrollTo(1)}>
                        Blocks
                      </Button>
                    </div>
                  </Plug>
                  <div className="mt-4">
                    <ConsoleLog atom={formAtom} />
                  </div>
                </div>
              </div>
              <div className="embla__slide">
                <form.Field
                  name="blocks"
                  children={(field) => (
                    <>
                      <div className="h-[400px] w-full" data-registry="plate">
                        <PlateEditor
                          // value={blocksToPlate({
                          //   blocks: content.blocks,
                          //   blocks_layout: content.blocks_layout,
                          //   content,
                          // })}
                          value={blocksToPlateNew(content)}
                          onChange={(newValue) => {
                            field.handleChange(newValue);
                          }}
                          emblaApi={emblaApi2}
                        />
                      </div>
                      <pre>{JSON.stringify(field.state.value, null, 2)}</pre>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <Plug pluggable="sidebar" id="main-sidebar-form">
          <form.Field
            name="blocks"
            children={(field) => (
              <>
                {/* <pre>{JSON.stringify(field.state.value, null, 2)}</pre> */}
                <pre>
                  {JSON.stringify(field.form.getFieldValue('title'), null, 2)}
                </pre>
              </>
            )}
          />
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef2}>
              <div className="embla__container">
                <div className="embla__slide">Slide 1</div>
                <div className="embla__slide">Slide 2</div>
              </div>
            </div>
          </div>
        </Plug>
      </main>
    </HydrateAtoms>
  );
}
