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
import {
  RecycleBinListing,
  type RecycleBinActionData,
} from '../components/RecycleBin/RecycleBinListing';
import {
  getQueryStateFromSearchParams,
  normalizeRecycleBinPaths,
  toRecycleBinQuery,
} from '../components/RecycleBin/utils';

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
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);
  const queryState = getQueryStateFromSearchParams(
    new URL(request.url).searchParams,
  );
  const { data: recycleBin } = await cli.getRecycleBin({
    query: toRecycleBinQuery(queryState),
  });

  return data(
    flattenToAppURL({
      recycleBin: normalizeRecycleBinPaths(recycleBin, cli.config.apiPath),
      queryState,
    }),
  );
}

export async function action({
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);
  const url = new URL(request.url);
  const formData = await request.formData();
  const intent = formData.get('_action');
  const selectedItems = formData.getAll('selected_items').map(String);
  const failures: Array<{ id: string; message: string }> = [];
  let succeeded = 0;

  if (intent === 'empty') {
    try {
      await cli.emptyRecycleBin();
      return redirect('/@@recyclebin');
    } catch (error) {
      return data<RecycleBinActionData>(
        { message: getErrorMessage(error) },
        { status: 400 },
      );
    }
  }

  if (intent !== 'restore-selected' && intent !== 'purge-selected') {
    return data<RecycleBinActionData>(
      { message: 'Unsupported recycle bin action.' },
      { status: 400 },
    );
  }

  for (const id of selectedItems) {
    try {
      if (intent === 'restore-selected') {
        await cli.restoreRecycleBinItem({ id, data: {} });
      } else {
        await cli.purgeRecycleBinItem({ id });
      }
      succeeded += 1;
    } catch (error) {
      failures.push({ id, message: getErrorMessage(error) });
    }
  }

  if (failures.length > 0) {
    return data<RecycleBinActionData>(
      {
        message: `${succeeded} succeeded, ${failures.length} failed.`,
        failures,
      },
      { status: 400 },
    );
  }

  return redirect(`/@@recyclebin${url.search}`);
}

export default function RecycleBin() {
  const { recycleBin, queryState } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>() as
    | RecycleBinActionData
    | undefined;

  return (
    <main>
      <Container width="default">
        <RecycleBinListing
          recycleBin={recycleBin}
          queryState={queryState}
          actionData={actionData}
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
              ? t('cmsui.recyclebin.errors.disabledTitle')
              : t('cmsui.recyclebin.errors.genericTitle')}
          </h1>
          <p>
            {error?.status === 404
              ? t('cmsui.recyclebin.errors.disabledDescription')
              : t('cmsui.recyclebin.errors.genericDescription')}
          </p>
        </section>
      </Container>
    </main>
  );
}
