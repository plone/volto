import { useLoaderData } from 'react-router';
import { requireAuthCookie } from '../auth/auth';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}
export async function loader({ request }) {
  return await requireAuthCookie(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return `Welcome user ${data}`;
}
