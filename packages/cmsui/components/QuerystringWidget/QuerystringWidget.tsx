import type { BaseFormFieldProps } from '../TextField/TextField';
import { useLoaderData } from 'react-router';
import type { loader as editLoader } from '../../routes/edit';

interface QuerystringWidgetProps extends BaseFormFieldProps {
  // Add your custom props here if needed
}

export function QuerystringWidget(props: QuerystringWidgetProps) {
  const { content } = useLoaderData<typeof editLoader>();
  const { label, description, errorMessage, ...rest } = props;

  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {/* Add your querystring input here */}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}

QuerystringWidget.displayName = 'QuerystringWidget';
