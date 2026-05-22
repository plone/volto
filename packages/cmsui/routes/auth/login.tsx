import {
  Form,
  useActionData,
  useLoaderData,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  RouterContextProvider,
  useLocation,
  type MetaFunction,
} from 'react-router';
import { jwtDecode } from 'jwt-decode';
import {
  ploneClientContext,
  ploneContentContext,
  ploneSiteContext,
} from 'seven/app/middleware.server';
import { getAuthFromRequest, setAuthOnResponse } from '@plone/react-router';
import { TextField, Link } from '@plone/components/quanta';
import CloseSVG from '@plone/components/icons/close.svg?react';
import SlotRenderer from '@plone/layout/slots/SlotRenderer';
import { Trans, useTranslation } from 'react-i18next';
import type { RootLoader } from 'seven/app/root';

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const token = await getAuthFromRequest(request);
  if (token) throw redirect('/');

  const content = context.get(ploneContentContext);
  const site = context.get(ploneSiteContext);
  return { content, siteTitle: site['plone.site_title'] };
}

export const meta: MetaFunction<unknown, { root: RootLoader }> = ({
  matches,
}) => {
  const rootData = matches.find((match) => match.id === 'root')?.data;

  const siteTitle = rootData?.site?.['plone.site_title'];

  return [{ title: siteTitle || 'Login' }];
};

type LoginErrorResponse = {
  status: number;
  data: {
    error: {
      message: string;
    };
  };
};

export async function action({
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const cli = context.get(ploneClientContext);

  try {
    const { data } = await cli.login({ data: { login: username, password } });
    const decodedToken = jwtDecode<{
      sub: string;
      exp: number;
      fullname: string | null;
    }>(data.token);
    const expires = new Date(decodedToken.exp * 1000);
    const response = redirect('/');
    return await setAuthOnResponse(response, data.token, { expires });
  } catch (error: any) {
    return {
      status: Number(error?.status) || 500,
      data: {
        error: {
          message: error?.data?.error?.message || 'Login failed',
        },
      },
    } satisfies LoginErrorResponse;
  }
}

export default function Login() {
  const { content, siteTitle } = useLoaderData<typeof loader>();
  const actionResult = useActionData<typeof action>() as
    | LoginErrorResponse
    | undefined;
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <main
      className={`
        grid min-h-screen
        has-[>*:nth-child(2)]:grid-cols-[minmax(50%,1fr)_auto]
      `}
    >
      <div className="flex h-full flex-col justify-center p-15">
        <div className="relative flex h-full flex-1 flex-col items-center justify-center">
          <Link
            className={`
              focus:bg-quanta-artic focus:shadow-sm
              absolute top-0 right-0 flex cursor-default items-center justify-center rounded-md
              border-0 bg-quanta-air p-1 px-4.5 py-3 text-center text-xl/6 font-medium
              text-quanta-iron transition
              hover:bg-quanta-snow hover:shadow-sm
              active:bg-quanta-silver active:shadow-md
              has-[svg]:rounded-full has-[svg]:p-3 has-[svg]:text-xs has-[svg]:text-quanta-iron
              pressed:bg-quanta-cobalt pressed:[&_svg]:text-white
            `}
            aria-label={t('cmsui.auth.returnToHome')}
            href="/"
          >
            <CloseSVG />
          </Link>
          <div
            className={`
              flex flex-col items-center
              sm:mx-auto sm:w-full sm:max-w-md
            `}
          >
            <SlotRenderer
              name="loginLogo"
              content={content}
              location={location}
            />
            <h2
              id="login-header"
              className="mt-6 text-center text-2xl leading-8 font-bold tracking-wide text-gray-900"
            >
              {t('cmsui.auth.signInTo', { site: siteTitle || 'Volto' })}
            </h2>
          </div>
          <div className="mx-auto mt-11 w-full max-w-[360px]">
            <div className="bg-quanta-air">
              <Form className="space-y-6" method="post">
                <TextField
                  label={t('cmsui.auth.username')}
                  name="username"
                  isRequired
                />
                <div>
                  <TextField
                    label={t('cmsui.auth.password')}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    isRequired
                    isInvalid={actionResult?.status === 401 ? true : undefined}
                    errorMessage={
                      actionResult?.status === 401
                        ? actionResult?.data?.error.message
                        : undefined
                    }
                  />
                  <span className="text-sm text-quanta-iron">
                    <Trans
                      i18nKey="cmsui.auth.forgotPassword"
                      components={{ a: <Link href="/reset-password" /> }}
                    />
                  </span>
                </div>
                <SlotRenderer
                  name="loginActions"
                  content={content}
                  location={location}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <SlotRenderer name="loginHero" content={content} location={location} />
    </main>
  );
}
