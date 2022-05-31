/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { isEqual } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { SidebarPortal, Hero } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

import Data from './Data';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  uploading: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class EditComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any),
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    editable: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    editable: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onUploadImage = this.onUploadImage.bind(this);
    this.state = {
      uploading: false,
    };

    const { Map } = this.props.immutableLib;

    if (!__SERVER__) {
      const { DefaultDraftBlockRenderMap, EditorState } = props.draftJs;
      const { stateFromHTML } = props.draftJsImportHtml;

      this.titleEditor = React.createRef();
      this.descriptionEditor = React.createRef();

      const blockTitleRenderMap = Map({
        unstyled: {
          element: 'h1',
        },
      });

      const blockDescriptionRenderMap = Map({
        unstyled: {
          element: 'div',
        },
      });

      this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
        blockTitleRenderMap,
      );

      this.extendedDescripBlockRenderMap = DefaultDraftBlockRenderMap.merge(
        blockDescriptionRenderMap,
      );

      let titleEditorState;
      let descriptionEditorState;
      if (props.data && props.data.title) {
        titleEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.title),
        );
      } else {
        titleEditorState = EditorState.createEmpty();
      }
      if (props.data && props.data.description) {
        descriptionEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.description),
        );
      } else {
        descriptionEditorState = EditorState.createEmpty();
      }
      this.state = {
        uploading: false,
        titleEditorState,
        descriptionEditorState,
        currentFocused: 'title',
      };
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.titleEditor.current.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }

    const { EditorState } = this.props.draftJs;
    const { stateFromHTML } = this.props.draftJsImportHtml;

    if (
      nextProps.data.title &&
      this.props.data.title !== nextProps.data.title &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.title);
      this.setState({
        titleEditorState: nextProps.data.title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (
      nextProps.data.description &&
      this.props.data.description !== nextProps.data.description &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.description);
      this.setState({
        descriptionEditorState: nextProps.data.description
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (nextProps.selected !== this.props.selected) {
      if (this.state.currentFocused === 'title') {
        this.titleEditor.current.focus();
      } else {
        this.descriptionEditor.current.focus();
      }
    }
  }

  /**
   * @param {*} nextProps
   * @param {*} nextState
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps) {
    return this.props.selected || !isEqual(this.props.data, nextProps.data);
  }

  changeCurrentFocus(currentFocused) {
    this.setState(() => ({ currentFocused }));
  }

  /**
   * Change Title handler
   * @method onChangeTitle
   * @param {object} titleEditorState Editor state.
   * @returns {undefined}
   */
  onChangeTitle(titleEditorState) {
    this.setState({ titleEditorState }, () => {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        title: titleEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Change Description handler
   * @method onChangeDescription
   * @param {object} descriptionEditorState Editor state.
   * @returns {undefined}
   */
  onChangeDescription(descriptionEditorState) {
    this.setState({ descriptionEditorState }, () => {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        description: descriptionEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(
        getBaseUrl(this.props.pathname),
        {
          '@type': 'Image',
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file.name,
          },
        },
        this.props.block,
      );
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.placeholder);

    return (
      <div
        className={cx(
          'block hero align',
          {
            selected: this.props.selected,
          },
          {
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
      >
        <Hero
          {...this.props}
          uploading={this.state.uploading}
          placeholder={placeholder}
          titleEditorState={this.state.titleEditorState}
          descriptionEditorState={this.state.descriptionEditorState}
          extendedBlockRenderMap={this.extendedBlockRenderMap}
          extendedDescripBlockRenderMap={this.extendedDescripBlockRenderMap}
          onChangeTitle={this.onChangeTitle}
          onChangeDescription={this.onChangeDescription}
          onUploadImage={this.onUploadImage}
          changeCurrentFocus={this.changeCurrentFocus}
          titleEditor={this.titleEditor}
          descriptionEditor={this.descriptionEditor}
          isEditMode={true}
        />
        <SidebarPortal selected={this.props.selected}>
          <Data {...this.props} />
        </SidebarPortal>
      </div>
    );
  }
}

const Edit = injectLazyLibs(['draftJs', 'immutableLib', 'draftJsImportHtml'])(
  EditComponent,
);

export default compose(
  injectIntl,
  withBlockExtensions,
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data,
    }),
    { createContent },
  ),
)(Edit);
