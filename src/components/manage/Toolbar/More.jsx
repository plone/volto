/**
 * More component.
 * @module components/manage/Toolbar/More
 */

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { find } from 'lodash';
import { toast } from 'react-toastify';
import { parse } from 'date-fns';
import { Toast } from '@plone/volto/components';
import { Pluggable, Plug } from '@plone/volto/components/manage/Pluggable';
import { Icon, Display, Workflow } from '@plone/volto/components';
import {
  applyWorkingCopy,
  createWorkingCopy,
  removeWorkingCopy,
} from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import userSVG from '@plone/volto/icons/user.svg';
import applySVG from '@plone/volto/icons/ready.svg';
import removeSVG from '@plone/volto/icons/circle-dismiss.svg';

const messages = defineMessages({
  personalTools: {
    id: 'Personal tools',
    defaultMessage: 'Personal tools',
  },
  history: {
    id: 'History',
    defaultMessage: 'History',
  },
  sharing: {
    id: 'Sharing',
    defaultMessage: 'Sharing',
  },
  ManageTranslations: {
    id: 'Manage Translations',
    defaultMessage: 'Manage Translations',
  },
  CreateWorkingCopy: {
    id: 'Create working copy',
    defaultMessage: 'Create working copy',
  },
  applyWorkingCopy: {
    id: 'Apply working copy',
    defaultMessage: 'Apply working copy',
  },
  removeWorkingCopy: {
    id: 'Remove working copy',
    defaultMessage: 'Remove working copy',
  },
  viewWorkingCopy: {
    id: 'View working copy',
    defaultMessage: 'View working copy',
  },
  workingAppliedTitle: {
    id: 'Changes applied.',
    defaultMessage: 'Changes applied',
  },
  workingCopyAppliedBy: {
    id:
      'Made by {creator} on {date}. This is not a working copy anymore, but the main content.',
    defaultMessage:
      'Made by {creator} on {date}. This is not a working copy anymore, but the main content.',
  },
  workingCopyRemovedTitle: {
    id: 'The working copy was discarded',
    defaultMessage: 'The working copy was discarded',
  },
});

/**
 * More container class.
 * @class More
 * @extends Component
 */
class More extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
      '@type': PropTypes.string,
      is_folderish: PropTypes.bool,
      review_state: PropTypes.string,
    }),
    loadComponent: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    content: null,
  };
  state = {
    openManageTranslations: false,
    pushed: false,
  };

  push = (selector) => {
    this.setState(() => ({
      pushed: true,
    }));
    this.props.loadComponent(selector);
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const path = getBaseUrl(this.props.pathname);
    const editAction = find(this.props.actions.object, { id: 'edit' });
    const historyAction = find(this.props.actions.object, { id: 'history' });
    const sharingAction = find(this.props.actions.object, {
      id: 'local_roles',
    });
    const { content, intl, lang } = this.props;
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return (
      <div
        className="menu-more pastanaga-menu"
        style={{
          flex: this.props.theToolbar.current
            ? `0 0 ${
                this.props.theToolbar.current.getBoundingClientRect().width
              }px`
            : null,
        }}
      >
        <header>
          <h2>{this.props.content.title}</h2>
          <button
            className="more-user"
            aria-label={this.props.intl.formatMessage(messages.personalTools)}
            onClick={() => this.push('personalTools')}
            tabIndex={0}
          >
            <Icon name={userSVG} size="30px" />
          </button>
        </header>
        <div className="pastanaga-menu-list">
          <ul>
            <Pluggable name="toolbar-more-menu-list" />
            <Plug pluggable="toolbar-more-menu-list" id="state">
              {this.props.content['@type'] !== 'Plone Site' && (
                // Plone Site does not have workflow
                <li className="state-select">
                  <Workflow pathname={path} />
                </li>
              )}
            </Plug>
            <Plug pluggable="toolbar-more-menu-list" id="view">
              {this.props.content['@type'] !== 'Plone Site' && (
                // Plone Site does not have view (yet)
                <li className="display-select">
                  {editAction && <Display pathname={path} />}
                </li>
              )}
            </Plug>
            <Plug pluggable="toolbar-more-menu-list" id="history">
              {this.props.content['@type'] !== 'Plone Site' && (
                // Plone Site does not have history (yet)
                <li>
                  <Link to={`${path}/history`}>
                    <div>
                      <span className="pastanaga-menu-label">
                        {historyAction?.title ||
                          this.props.intl.formatMessage(messages.history)}
                      </span>
                      <span className="pastanaga-menu-value" />
                    </div>
                    <Icon name={rightArrowSVG} size="24px" />
                  </Link>
                </li>
              )}
            </Plug>
            <Plug pluggable="toolbar-more-menu-list" id="sharing">
              {sharingAction && (
                <li>
                  <Link to={`${path}/sharing`}>
                    {this.props.intl.formatMessage(messages.sharing)}
                    <Icon name={rightArrowSVG} size="24px" />
                  </Link>
                </li>
              )}
            </Plug>
          </ul>
        </div>
        <Pluggable name="toolbar-more-manage-content">
          {(pluggables) => (
            <>
              {pluggables.length > 0 && (
                <>
                  <header>
                    <h2>Manage content...</h2>
                  </header>
                  <div className="pastanaga-menu-list">
                    <ul>
                      {pluggables.map((p) => (
                        <>{p()}</>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </Pluggable>
        {config.settings.hasWorkingCopySupport &&
          this.props.content['@type'] !== 'Plone Site' && (
            <>
              {!this.props.content.working_copy && (
                <Plug pluggable="toolbar-more-manage-content" id="workingcopy">
                  <li>
                    <button
                      aria-label={this.props.intl.formatMessage(
                        messages.CreateWorkingCopy,
                      )}
                      onClick={() => {
                        this.props.createWorkingCopy(path).then((response) => {
                          this.props.history.push(
                            flattenToAppURL(response['@id']),
                          );
                          this.props.closeMenu();
                        });
                      }}
                    >
                      {this.props.intl.formatMessage(
                        messages.CreateWorkingCopy,
                      )}

                      <Icon name={rightArrowSVG} size="24px" />
                    </button>
                  </li>
                </Plug>
              )}
              {this.props.content.working_copy &&
                this.props.content.working_copy_of && (
                  <Plug
                    pluggable="toolbar-more-manage-content"
                    id="workingcopy"
                  >
                    <li>
                      <button
                        aria-label={this.props.intl.formatMessage(
                          messages.applyWorkingCopy,
                        )}
                        onClick={() => {
                          this.props.applyWorkingCopy(path).then((response) => {
                            this.props.history.push(
                              flattenToAppURL(
                                this.props.content.working_copy_of['@id'],
                              ),
                            );
                            this.props.closeMenu();
                            toast.info(
                              <Toast
                                info
                                title={intl.formatMessage(
                                  messages.workingAppliedTitle,
                                )}
                                content={intl.formatMessage(
                                  messages.workingCopyAppliedBy,
                                  {
                                    creator: content.working_copy?.creator_name,
                                    date: new Intl.DateTimeFormat(
                                      lang,
                                      dateOptions,
                                    ).format(
                                      parse(content.working_copy?.created),
                                    ),
                                  },
                                )}
                              />,
                              {
                                toastId: 'workingcopyapplyinfo',
                                autoClose: 10000,
                              },
                            );
                          });
                        }}
                      >
                        {this.props.intl.formatMessage(
                          messages.applyWorkingCopy,
                        )}

                        <Icon name={applySVG} size="24px" />
                      </button>
                    </li>
                    <li>
                      <button
                        aria-label={this.props.intl.formatMessage(
                          messages.removeWorkingCopy,
                        )}
                        onClick={() => {
                          this.props
                            .removeWorkingCopy(path)
                            .then((response) => {
                              this.props.history.push(
                                flattenToAppURL(
                                  this.props.content.working_copy_of['@id'],
                                ),
                              );
                              this.props.closeMenu();
                              toast.info(
                                <Toast
                                  info
                                  title={intl.formatMessage(
                                    messages.workingCopyRemovedTitle,
                                  )}
                                />,
                                {
                                  toastId: 'workingcopyremovednotice',
                                  autoClose: 10000,
                                },
                              );
                            });
                        }}
                      >
                        {this.props.intl.formatMessage(
                          messages.removeWorkingCopy,
                        )}

                        <Icon name={removeSVG} size="24px" color="#e40166" />
                      </button>
                    </li>
                  </Plug>
                )}
              {this.props.content.working_copy &&
                !this.props.content.working_copy_of && (
                  <Plug
                    pluggable="toolbar-more-manage-content"
                    id="workingcopy"
                  >
                    <li>
                      <Link
                        to={flattenToAppURL(
                          this.props.content.working_copy['@id'],
                        )}
                        onClick={() => this.props.closeMenu()}
                      >
                        {this.props.intl.formatMessage(
                          messages.viewWorkingCopy,
                        )}
                        <Icon name={rightArrowSVG} size="24px" />
                      </Link>
                    </li>
                  </Plug>
                )}
            </>
          )}
        {editAction && config.settings.isMultilingual && (
          <Plug pluggable="toolbar-more-manage-content" id="multilingual">
            <li>
              <Link to={`${path}/manage-translations`}>
                {this.props.intl.formatMessage(messages.ManageTranslations)}

                <Icon name={rightArrowSVG} size="24px" />
              </Link>
            </li>
          </Plug>
        )}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    (state, props) => ({
      actions: state.actions.actions,
      pathname: props.pathname,
      content: state.content.data,
      lang: state.intl.locale,
    }),
    { applyWorkingCopy, createWorkingCopy, removeWorkingCopy },
  ),
)(More);
