import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getNavroot } from '@plone/volto/actions/navroot/navroot';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import zoomSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

const SearchWidget = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const history = useHistory();
  const onChangeText = (event, { value }) => {
    setText(value);
  };
  const pathname = props.pathname;

  const navroot = useSelector((state) => state.navroot?.data);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const onSubmit = (event) => {
    const path =
      pathname?.length > 0 ? `&path=${encodeURIComponent(pathname)}` : '';

    history.push(`./search?SearchableText=${encodeURIComponent(text)}${path}`);
    // reset input value
    setText('');
    setSearchOpen(false);
    event.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (searchOpen && isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen, isMobile]);

  useEffect(() => {
    if (!hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  const onSearchButtonClick = (e) => {
    if (isMobile && !searchOpen) {
      e.preventDefault();
      setSearchOpen(true);
    }
  };

  return (
    <Form action={`${navroot?.navroot?.['@id']}/search`} onSubmit={onSubmit}>
      <Form.Field className="searchbox">
        <Input
          aria-label={intl.formatMessage(messages.search)}
          onChange={onChangeText}
          name="SearchableText"
          value={text}
          transparent
          autoComplete="off"
          placeholder={intl.formatMessage(messages.searchSite)}
          title={intl.formatMessage(messages.search)}
          input={{ ref: inputRef }}
          style={{ display: isMobile && !searchOpen ? 'none' : undefined }}
        />
        <button
          aria-label={intl.formatMessage(messages.search)}
          onClick={onSearchButtonClick}
        >
          <Icon name={zoomSVG} size="18px" />
        </button>
      </Form.Field>
    </Form>
  );
};

export default SearchWidget;
