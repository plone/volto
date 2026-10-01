/**
 * FieldView component.
 * @module components/theme/FieldsetView/FieldView
 */
import { Segment, Grid, Label } from 'semantic-ui-react';
import ErrorBoundary from '@plone/volto/components/theme/Error/ErrorBoundary';
import config from '@plone/volto/registry';
import type { FieldDefinition } from './fields';

export type FieldViewProps = {
  /** The field to render, as returned by `getFieldDefinition`. */
  field: FieldDefinition;
  /** The content object holding the field's value. */
  data: Record<string, any>;
};

/**
 * A single field of the fieldset-based (non-blocks) view: its label and its
 * value, rendered by the view widget the schema asks for.
 *
 * The field definition is handed to the widget as props, the way the edit side
 * does it, so that the `widgetProps` a backend declares through
 * `frontendOptions` reach the widget. The value is applied last, so nothing the
 * schema carries can shadow it.
 *
 * The title is rendered bare, without a label, since it is the heading of the
 * page rather than one field among others.
 */
const FieldView = ({ field, data }: FieldViewProps) => {
  // Read at render time, not at import time: the registry is populated by
  // add-ons after this module is first evaluated. `views.getWidget` is a
  // configuration entry so that the resolver can be replaced wholesale.
  const Widget = config.widgets.views.getWidget(field);

  const value = (
    <ErrorBoundary name={field.id}>
      <Widget {...field} value={data[field.id]} />
    </ErrorBoundary>
  );

  return field.id !== 'title' ? (
    <Grid celled="internally">
      <Grid.Row>
        <Label title={field.id}>{field.title}:</Label>
      </Grid.Row>
      <Grid.Row>
        <Segment basic>{value}</Segment>
      </Grid.Row>
    </Grid>
  ) : (
    value
  );
};

export default FieldView;
