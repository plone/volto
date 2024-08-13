import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { updateContent } from '../content/update';
import { getContent } from '../content/get';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getLinkintegrityQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Linkintegrity', () => {
  test('Hook - Successful', async () => {
    const contentData1 = {
      '@type': 'Document',
      title: 'page-1',
    };
    const contentData2 = {
      '@type': 'Document',
      title: 'page-2',
    };

    await createContent({ path: '/', data: contentData1, config: cli.config });
    await createContent({ path: '/', data: contentData2, config: cli.config });

    const updateContentData = {
      relatedItems: [
        {
          '@id': '/page-2',
          '@type': 'Document',
          CreationDate: '2023-07-29T22:37:30+05:30',
          Creator: 'admin',
          Date: '2023-07-29T22:37:30+05:30',
          Description: 'sum1',
          EffectiveDate: 'None',
          ExpirationDate: 'None',
          ModificationDate: '2023-07-29T22:37:30+05:30',
          Subject: [],
          Title: 'page-2',
          Type: 'Page',
          UID: '',
          author_name: null,
          cmf_uid: 13,
          commentators: [],
          created: '2023-07-29T17:07:30+00:00',
          description: 'sum1',
          effective: '1969-12-30T18:30:00+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-30T18:30:00+00:00',
          featured: null,
          getIcon: null,
          getId: 'page-2',
          getObjSize: '0 KB',
          getPath: '/Plone/page-2',
          getRemoteUrl: null,
          getURL: 'http://localhost:3000/page-1',
          id: 'page-2',
          image_field: null,
          image_scales: null,
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          listCreators: ['admin'],
          location: null,
          mime_type: 'text/plain',
          modified: '2023-07-29T17:07:30+00:00',
          portal_type: 'Document',
          review_state: 'private',
          start: null,
          sync_uid: null,
          title: 'page-2',
          total_comments: 0,
        },
      ],
    };

    await updateContent({
      path: contentData1.title,
      data: updateContentData,
      config: cli.config,
    });

    const page = await getContent({
      path: contentData1.title,
      config: cli.config,
    });

    const uid = page.relatedItems[0].UID;

    const { result } = renderHook(
      () => useQuery(getLinkintegrityQuery({ uids: uid })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data[0]['@id']).toBe(
      'http://localhost:55001/plone/page-2',
    );
    expect(result.current.data[0].breaches[0]['@id']).toBe(
      'http://localhost:55001/plone/page-1',
    );

    console.log(result.current.data);
  });
});
