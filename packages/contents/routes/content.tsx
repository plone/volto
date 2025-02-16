import { useAppRouter } from '@plone/providers';
import { ContentsTable } from '../components/ContentsTable';
import { ContentsProvider } from '../providers/contents';

export function Contents() {
  const flattenToAppURL = useAppRouter().flattenToAppURL;
  const intl = () => ({ formatedMessage: (id) => id });
  const getContentIcon = () => {};
  const toastify = { toast: { error: () => '' } };
  const path = useAppRouter().useLocation().pathname;

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
        objectActions={this.props.objectActions}
        loading={loading}
        textFilter={this.state.filter}
        onChangeTextFilter={(value) => {
          this.onChangeFilter(undefined, { value });
        }}
        selected={new Set(this.state.selected)}
        setSelected={(selected) => {
          if (selected === 'all') {
            this.onSelectAll();
          } else {
            this.setState({ selected: [...selected] });
          }
        }}
        indexes={this.state.index}
        onSelectIndex={(index) => {
          this.onSelectIndex(undefined, { value: index });
        }}
        sortItems={(id) => this.onSortItems(undefined, { value: id })}
        upload={this.upload}
        rename={this.rename}
        workflow={this.workflow}
        tags={this.tags}
        properties={this.properties}
        deleteItem={(id) =>
          Promise.resolve(this.delete(undefined, { value: id }))
        }
        // addableTypes={this.props.addableTypes}
      />
    </ContentsProvider>
  );
}
