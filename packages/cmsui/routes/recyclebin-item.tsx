import { flattenToAppURL } from '@plone/helpers';
import { requireAuthCookie } from '@plone/react-router';
import {
  data,
  redirect,
  RouterContextProvider,
  useActionData,
  useLoaderData,
  useRouteError,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import { Container } from '@plone/components/quanta';
import { useTranslation } from 'react-i18next';
import { ploneClientContext } from 'seven/app/middleware.server';
import { RecycleBinItemDetails } from '../components/RecycleBin/RecycleBinItemDetails';

const getErrorMessage = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data &&
    'message' in error.data
  ) {
    return String(error.data.message);
  }
  return 'Request failed';
};

export async function loader({
  params,
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);
  const searchParams = new URL(request.url).searchParams;
  const query = {
    b_start: searchParams.get('b_start') ?? undefined,
    b_size: searchParams.get('b_size') ?? undefined,
  };
  const { data: item } = await cli.getRecycleBinItem({
    id: params.id ?? '',
    query,
  });

  return data(flattenToAppURL({ item }));
}

export async function action({
  params,
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);
  const id = params.id ?? '';
  const formData = await request.formData();
  const intent = formData.get('_action');
  const targetPath = String(formData.get('target_path') ?? '').trim();

  try {
    if (intent === 'restore') {
      const result = await cli.restoreRecycleBinItem({
        id,
        data: targetPath ? { target_path: targetPath } : {},
      });
      const restoredUrl = result.data.restored_item?.['@id'];
      return redirect(
        restoredUrl ? flattenToAppURL(restoredUrl) : '/@@recyclebin',
      );
    }

    if (intent === 'purge') {
      await cli.purgeRecycleBinItem({ id });
      return redirect('/@@recyclebin');
    }

    if (intent === 'restore-child') {
      const restoreId = String(formData.get('restore_id') ?? '').trim();
      if (!restoreId || !targetPath) {
        return data(
          { message: 'Child restore requires a target path.' },
          { status: 400 },
        );
      }
      await cli.restoreRecycleBinItem({
        id,
        data: { restore_id: restoreId, target_path: targetPath },
      });
      return redirect(`/@@recyclebin/${id}`);
    }

    return data(
      { message: 'Unsupported recycle bin action.' },
      { status: 400 },
    );
  } catch (error) {
    return data({ message: getErrorMessage(error) }, { status: 400 });
  }
}

export default function RecycleBinItem() {
  const { item } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>() as
    | { message?: string }
    | undefined;

  return (
    <main>
      <Container width="layout">
        <RecycleBinItemDetails
          item={item}
          actionMessage={actionData?.message}
        />
      </Container>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as { status?: number };
  const { t } = useTranslation();

  return (
    <main>
      <Container width="default">
        <section className="py-8">
          <h1 className="documentFirstHeading">
            {error?.status === 404
              ? t('cmsui.recyclebin.errors.itemNotFoundTitle')
              : t('cmsui.recyclebin.errors.genericTitle')}
          </h1>
          <p>
            {error?.status === 404
              ? t('cmsui.recyclebin.errors.itemNotFoundDescription')
              : t('cmsui.recyclebin.errors.genericDescription')}
          </p>
        </section>
      </Container>
    </main>
  );
}
