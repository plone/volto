import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import { BlockDataForm } from '@plone/volto/components';
import { TeaserSchema } from './schema';
import { isEmpty } from 'lodash';

const TeaserData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();

  const href = data.href?.[0];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isEmpty(href) && !data.title && !data.description) {
      dispatch(getContent(href['@id'], null, block)).then((resp) => {
        onChangeBlock(block, {
          ...data,
          ...(!data.title && { title: resp.title }),
          ...(!data.description && { description: resp.description }),
          ...(!data.head_title && { head_title: resp.head_title }),
        });
      });
    }
    // This condition is required in order to not reset the fields on mount (block creation),
    // when the href is undefined yet. It makes the block defaults play well with this block.
    if (href === undefined && data.href !== undefined) {
      onChangeBlock(block, {
        ...data,
        title: '',
        description: '',
        head_title: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  const schema = TeaserSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      block={block}
    />
  );
};

export default TeaserData;
