export const SidebarPortal = jest.fn(() => <div id="Portal" />);
export const Sidebar = jest.fn(() => <div id="Sidebar" />);
export const AlignBlock = jest.fn((props) => (
  <div className="align-buttons" data-props={JSON.stringify(props)}></div>
));
