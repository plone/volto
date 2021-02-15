import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';

import { Icon, Sidebar, Toolbar } from '@plone/volto/components';
import BlocksForm from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
import { emptyBlocksForm } from '@plone/volto/helpers/Blocks/Blocks';
import { isEmpty } from 'lodash';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

class EditSlot extends React.Component {
  constructor(props) {
    super(props);

    const { slot_data } = props;
    const data = isEmpty(slot_data?.blocks) ? emptyBlocksForm() : slot_data;

    this.state = {
      isClient: false,
      selectedBlock: data.blocks_layout.items[0],
      data,
    };

    // special variable
    this.blocksState = {};
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  componentDidUpdate() {
    if (isEmpty(this.state.data?.blocks || {})) {
      this.setState({ data: emptyBlocksForm() });
    }
  }

  render() {
    const { pathname, content } = this.props;
    const { data, selectedBlock } = this.state;
    return (
      <div id="slot-edit">
        <div className="ui container">
          <Helmet title="Edit slot" />
          <BlocksForm
            pathname={pathname}
            onChangeField={(id, value) => {
              if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
                this.blockState[id] = value;
                this.setState({
                  data: {
                    ...data,
                    ...this.blockState,
                    [id]: value,
                  },
                });
              }
            }}
            onChangeFormData={(data) => this.setState({ data })}
            onSelectBlock={(id) => this.setState({ selectedBlock: id })}
            selectedBlock={selectedBlock}
            title="Edit slot"
            metadata={content}
            properties={data}
          />
          {this.state.isClient && (
            <>
              <Portal node={document.getElementById('toolbar')}>
                <Toolbar
                  pathname={this.props.pathname}
                  hideDefaultViewButtons
                  activity="edit"
                  inner={
                    <>
                      <Button
                        id="toolbar-save"
                        className="save"
                        aria-label={this.props.intl.formatMessage(
                          messages.save,
                        )}
                        onClick={() => this.form.current.onSubmit()}
                        disabled={this.props.updateRequest.loading}
                        loading={this.props.updateRequest.loading}
                      >
                        <Icon
                          name={saveSVG}
                          className="circled"
                          size="30px"
                          title={this.props.intl.formatMessage(messages.save)}
                        />
                      </Button>
                      <Button
                        className="cancel"
                        aria-label={this.props.intl.formatMessage(
                          messages.cancel,
                        )}
                        onClick={() => this.onCancel()}
                      >
                        <Icon
                          name={clearSVG}
                          className="circled"
                          size="30px"
                          title={this.props.intl.formatMessage(messages.cancel)}
                        />
                      </Button>
                    </>
                  }
                />
              </Portal>
              <Portal node={document.getElementById('sidebar')}>
                <Sidebar />
              </Portal>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      // const slotId = props.match.params.id;
      pathname: props.location.pathname,
      content: state.content.data,
      updateRequest: {},
    }),
    {},
  ),
)(EditSlot);
