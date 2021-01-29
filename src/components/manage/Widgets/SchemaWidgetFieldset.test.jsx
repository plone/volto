import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import renderer from 'react-test-renderer';
import { SchemaWidgetFieldsetComponent } from './SchemaWidgetFieldset';

test('renders a contents item component', () => {
  const component = renderer.create(
    <DragDropContext onDragEnd={(x) => x}>
      <Droppable droppableId="tabs-schema-edit" direction="horizontal">
        {(provided, snapshot) => (
          <div
            role="tablist"
            className="ui pointing secondary attached tabular menu"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <SchemaWidgetFieldsetComponent
              order={1}
              title="test"
              active={false}
              onOrderFieldset={(x) => x}
              onShowEditFieldset={(x) => x}
              onShowDeleteFieldset={(x) => x}
              onClick={(x) => x}
              getItemStyle={(x) => x}
              isDraggable={false}
              isDisabled={false}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
