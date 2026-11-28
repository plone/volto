/* Block-related examples and constants */

// ===== Constants =====
// Content example with object browser fields
export const contentExample = {
  '@id': 'page-1',
  related_pages: [],
  image: { url: "" },
  link: { href: "" }
};

// Blocks schema example with object browser widget
export const blocksSchemaExample = {
  title: 'Item',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['href'],
    },
  ],
  properties: {
    href: {
      title: 'title',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description'],
    },
  }
};

// Iframe schema example
export const iframeSchema = {
  title: 'Embed external content',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'url',
        'align',
        'privacy_statement',
        'privacy_cookie_key',
        'enabled',
      ],
    },
  ],
  properties: {
    url: {
      title: 'Embed URL',
    },
    privacy_statement: {
      title: 'Privacy statement',
      description: 'Short notification text',
      widget: 'text',
    },
    privacy_cookie_key: {
      title: 'Privacy cookie key',
      description: 'Identifies similar external content',
    },
    enabled: {
      title: 'Use privacy screen?',
      description: 'Enable/disable the privacy protection',
      type: 'boolean',
    },
  },
  required: ['url'],
};

// Block schema for sidebar form example
export const blockSchema = {
  title: 'Block Settings',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'alignment'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
      widget: 'textarea',
    },
    alignment: {
      title: 'Alignment',
      type: 'string',
      factory: 'Choice',
      choices: [
        ['left', 'Left'],
        ['center', 'Center'],
        ['right', 'Right'],
      ],
    },
  },
  required: [],
};

// ===== Object Browser Examples =====
// Basic HOC example
export const WithObjectBrowserExample = () => {
  return <div>My Component</div>;
};

// Open object browser examples
export const openObjectBrowserExamples = {
  basic: () => {
    // Opens the browser in the `image` mode by default if no config object specified
    this.props.openObjectBrowser();
  },
  linkMode: () => {
    // Opens the browser in the `link` mode
    this.props.openObjectBrowser({ mode: 'link' });
  },
  customDataName: () => {
    // Opens the browser defining which data property should save the selection
    this.props.openObjectBrowser({
      dataName: 'myfancydatafield',
    });
  },
  customSelectItem: () => {
    // Opens the browser defining the function that should be used to save the selection
    this.props.openObjectBrowser({
      onSelectItem: (url) =>
        this.props.onChangeBlock(this.props.block, {
          ...this.props.data,
          myfancydatafield: url,
        }),
    });
  }
};

// Object browser widget examples
export const ObjectBrowserWidgetExamples = {
  basic: () => (
    <ObjectBrowserWidget mode="image" return="single" />
  ),
  selectableTypes: () => (
    <ObjectBrowserWidget 
      widgetOptions={{
        pattern_options: {
          selectableTypes: ['News Item', 'Event']
        }
      }}
    />
  ),
  maximumSelectionSize: () => (
    <ObjectBrowserWidget 
      widgetOptions={{
        pattern_options: {
          maximumSelectionSize: 2
        }
      }}
    />
  )
};

// Plone specific examples
export const PloneExamples = {
  selectableTypes: () => (
    <RelatedItemsFieldWidget
      vocabulary="plone.app.vocabularies.Catalog"
      pattern_options={{
        maximumSelectionSize: 1,
        selectableTypes: ['News Item', 'Event'],
      }}
    />
  ),
  maximumSelectionSize: {
    single: () => (
      <RelatedItemsFieldWidget
        vocabulary="plone.app.vocabularies.Catalog"
        pattern_options={{ 
          maximumSelectionSize: 1, 
          selectableTypes: ['Event'] 
        }}
      />
    ),
    multiple: () => (
      <RelatedItemsFieldWidget
        vocabulary="plone.app.vocabularies.Catalog"
        pattern_options={{
          maximumSelectionSize: 10,
          selectableTypes: ['News Item'],
        }}
      />
    )
  }
};

// Widget mode configuration
export const widgetModeConfig = {
  widgetMapping: {
    ...widgetMapping,
    id: {
      ...widgetMapping.id,
      my_image_field: ObjectBrowserWidgetMode('image'),
      my_link_field: ObjectBrowserWidgetMode('link'),
    },
  },
  default: defaultWidget,
};

// ===== Sidebar Examples =====
// Basic sidebar portal example
export const SidebarPortalBasic = () => (
  <SidebarPortal>
    <div className="sidebar-container">
      <h2>Sidebar Content</h2>
      <p>This content will be rendered in the sidebar</p>
    </div>
  </SidebarPortal>
);

// Sidebar popup basic example
export const SidebarPopupBasic = () => (
  <SidebarPortal>
    <SidebarPopup>
      <div className="sidebar-popup-container">
        <h2>Popup Content</h2>
        <p>This content will be rendered in a popup within the sidebar</p>
      </div>
    </SidebarPopup>
  </SidebarPortal>
);

// Complete sidebar example with form
export const SidebarWithForm = () => (
  <SidebarPortal>
    <SidebarPopup>
      <div className="sidebar-form-container">
        <h2>Block Settings</h2>
        <BlockDataForm
          schema={schema}
          title="Block Settings"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </div>
    </SidebarPopup>
  </SidebarPortal>
);

// Advanced sidebar portal with form example
export const SidebarPortalWithForm = (props) => {
  const { selected, block, data, onChangeBlock } = props;

  return (
    <>
      <div className="block-content">
        <h2>{data?.title || 'Untitled Block'}</h2>
        <p>{data?.description || 'No description provided.'}</p>
        <div className={`align-${data?.alignment || 'left'}`}>
          Content alignment: {data?.alignment || 'left'}
        </div>
      </div>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={blockSchema}
          title={blockSchema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

// Sidebar popup example
export const SidebarPopupExample = (props) => {
  const { sidebarOpen } = props;

  return (
    <>
      <div className="block-content">
        <p>This is the block content in the main editing area.</p>
        <p>Click to configure this block and see the popup sidebar.</p>
      </div>

      <SidebarPopup open={sidebarOpen}>
        <div className="popup-content">
          <h3>Popup Configuration</h3>
          <p>This content appears in a popup sidebar overlay.</p>
          <form>
            <label>
              Setting 1:
              <input type="text" placeholder="Enter value" />
            </label>
            <label>
              Setting 2:
              <select>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>
          </form>
        </div>
      </SidebarPopup>
    </>
  );
};

// ===== DragDropList Example =====
export const DragDropListExample = ({ childList, state, setState, langs }) => (
  <DragDropList
    childList={childList}
    as="tbody"
    onMoveItem={(result) => {
      const { source, destination } = result;
      const ns = JSON.parse(JSON.stringify(state));
      Object.keys(ns.order).forEach((lang) => {
        const x = ns.order[lang][source.index];
        const y = ns.order[lang][destination.index];
        ns.order[lang][destination.index] = x;
        ns.order[lang][source.index] = y;
      });
      setState(ns);
      return true;
    }}
  >
    {({ index, draginfo }) => {
      return (
        <Ref innerRef={draginfo.innerRef} key={index}>
          <Table.Row {...draginfo.draggableProps}>
            <Table.Cell>
              <div {...draginfo.dragHandleProps}>
                <Icon name={dragSVG} size="18px" />
              </div>
            </Table.Cell>
            {langs.map((lang) => {
              const i = state.order[lang][index];
              const entry = state.data[lang][i];
              return (
                <Table.Cell key={lang}>
                  <TermInput
                    entry={entry}
                    onChange={(id, value) => {
                      const newState = { ...state };
                      newState.data[lang][i] = {
                        ...newState.data[lang][i],
                        [id]: value,
                      };

                      setState(newState);
                    }}
                  />
                </Table.Cell>
              );
            })}
            <Table.Cell>
              <Button basic onClick={() => {}}>
                <Icon
                  className="circled"
                  name={deleteSVG}
                  size="12px"
                />
              </Button>
            </Table.Cell>
          </Table.Row>
        </Ref>
      );
    }}
  </DragDropList>
); 