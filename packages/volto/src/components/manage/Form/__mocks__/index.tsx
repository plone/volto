export const Field = jest.fn((props) => (
  <div className="Field" id={props.id}>
    {props.title}
  </div>
));

export const InlineForm = jest.fn((props) => (
  <div id="InlineForm" data-schema={props.schema} />
));

export const ModalForm = jest.fn((props) => (
  <div id="ModalForm" data-schema={props.schema} />
));

export const UndoToolbar = jest.fn(() => <div id="UndoToolbar" />);

export const BlocksToolbar = jest.fn(() => <div id="BlocksToolbar" />);

export const BlockDataForm = jest.fn((props) => (
  <div id="BlockDataForm" data-schema={props.schema} />
));

export const BlocksForm = jest.fn((props) => (
  <div id="BlocksForm" data-schema={props.schema} />
));

export const Form = jest.fn((props) => (
  <div id="Form" data-schema={props.schema} />
));
