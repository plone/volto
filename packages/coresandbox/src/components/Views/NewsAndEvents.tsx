import { useEffect } from 'react';
import { searchContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';

type RootState = {
  search: {
    subrequests: {
      newsandevents: {
        items: {
          '@id': string;
          '@type': string;
          title: string;
          subject: string[];
        }[];
      };
    };
  };
};

const NewsAndEvents = () => {
  const newsandevents = useSelector(
    (state: RootState) => state.search.subrequests.newsandevents?.items,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: ['News Item', 'Event'],
          metadata_fields: ['subject', 'modified', 'someotherinfo'],

          // That's OK:
          // portal_type: ['News Item'],
          // metadata_fields: ['subject'],
        },
        'newsandevents',
      ),
    );
  }, [dispatch]);

  return (
    <Container>
      <h1>News And Events</h1>
      {newsandevents &&
        newsandevents.map((item) => (
          <div key={item['@id']}>
            <div>{item.title}</div>
            <div>{item['@type']}</div>
            <div>{item.subject}</div>
          </div>
        ))}
    </Container>
  );
};

export default NewsAndEvents;
