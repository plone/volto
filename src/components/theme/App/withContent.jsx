import { useQuery } from 'react-query';
import superagent from 'superagent';

export const apiGet = async ({ path = '' } = {}) => {
  const server = 'http://localhost:8080/Plone/++api++';
  const url = `${server}${path}`;
  const response = await superagent.get(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.body;
};

const withContent = (Component) => ({ ...props }) => {
  const { data } = useQuery('apiRequest', apiGet);
  return <Component {...props} content={data} />;
};

export default withContent;
