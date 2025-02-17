import { useAppRouter } from '@plone/providers';
import { ContentsTable } from '../components/ContentsTable';
import { ContentsProvider } from '../providers/contents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {}

export default function Contents(props) {
  const flattenToAppURL = useAppRouter().flattenToAppURL;
  const intl = () => ({ formatedMessage: (id) => id });
  const getContentIcon = () => {};
  const toastify = { toast: { error: () => '' } };
  const path = useAppRouter().useLocation().pathname;
  const state = {};
  const upload = () => {};
  const properties = () => {};
  const workflow = () => {};
  const tags = () => {};
  const rename = () => {};
  const deleteItem = () => {};
  const onSelectIndex = () => {};
  const onSelectAll = () => {};
  const onChangeFilter = () => {};
  const onSortItems = () => {};

  // debugger;
  return (
    <ContentsProvider
      flattenToAppURL={flattenToAppURL}
      // getBaseUrl={getBaseUrl}
      getContentIcon={getContentIcon}
      intl={intl}
      toast={toastify.toast}
    >
      <ContentsTable
        pathname={path}
        objectActions={props.objectActions}
        // loading={loading}
        textFilter={state.filter}
        onChangeTextFilter={(value) => {
          onChangeFilter(undefined, { value });
        }}
        selected={new Set(state.selected)}
        setSelected={(selected) => {
          if (selected === 'all') {
            onSelectAll();
          } else {
            setState({ selected: [...selected] });
          }
        }}
        indexes={state.index}
        onSelectIndex={(index) => {
          onSelectIndex(undefined, { value: index });
        }}
        sortItems={(id) => onSortItems(undefined, { value: id })}
        upload={upload}
        rename={rename}
        workflow={workflow}
        tags={tags}
        properties={properties}
        deleteItem={(id) => Promise.resolve(delete (undefined, { value: id }))}
        // addableTypes={props.addableTypes}
      />
    </ContentsProvider>
  );
}
