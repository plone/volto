import { clsx } from 'clsx';
import Slugger from 'github-slugger';
import { Link } from '@plone/components';
import { normalizeString } from '@plone/helpers';
import { BlocksFormData } from '@plone/types';

const slugger = new Slugger();

const RenderListItems = ({ items, data }) => {
  return items.map((item) => {
    const { id, level, title, override_toc, plaintext } = item;
    const slug = override_toc
      ? slugger.slug(normalizeString(plaintext))
      : slugger.slug(normalizeString(title)) || id;
    const List = data.ordered ? 'ol' : 'ul';

    return (
      item && (
        <li
          key={id}
          className={`
            item
            headline-${level}
          `}
        >
          <Link href={`#${slug}`}>{title}</Link>
          {item.items?.length > 0 && (
            <List
              className={clsx('ui list', {
                ordered: data.ordered,
                bulleted: !data.ordered,
              })}
            >
              <RenderListItems items={item.items} data={data} />
            </List>
          )}
        </li>
      )
    );
  });
};

interface DefaultToCProps {
  data: BlocksFormData;
  tocEntries: any[];
}

const View = ({ data, tocEntries }: DefaultToCProps) => {
  const List = data.ordered ? 'ol' : 'ul';

  return (
    <>
      {data.title && !data.hide_title ? <h2>{data.title}</h2> : ''}
      <List
        className={clsx('ui list', {
          ordered: data.ordered,
          bulleted: !data.ordered,
        })}
      >
        <RenderListItems items={tocEntries} data={data} />
      </List>
    </>
  );
};

export default View;
