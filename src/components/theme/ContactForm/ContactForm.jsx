/**
 * Contact Form container.
 * @module components/theme/ContactForm/ContactForm
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { useSelector,shallowEqual, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Container, Message, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Toolbar, Toast } from '@plone/volto/components';
import { emailNotification } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  send: {
    id: 'Send',
    defaultMessage: 'Send',
  },
  contactForm: {
    id: 'Contact form',
    defaultMessage: 'Contact form',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  from: {
    id: 'From',
    defaultMessage: 'From',
  },
  subject: {
    id: 'Subject',
    defaultMessage: 'Subject',
  },
  message: {
    id: 'Message',
    defaultMessage: 'Message',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  messageSent: {
    id: 'Email sent',
    defaultMessage: 'Email sent',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

/**
 * ContactForm class.
 * @class ContactForm
 * @extends Component
 */
const ContactFormComponent=({ location , history })=>{

  const dispatch=useDispatch();
  const intl=useIntl();
  const [isClient,setisClient]=useState(false);
  
  const {loaded,loading,error} = useSelector(
    (state) => ({
      loading: state.emailNotification.loading,
      loaded: state.emailNotification.loaded,
      error: state.emailNotification.error,
    }),shallowEqual);
    
  const pathname=location.pathname;
    
  useEffect(()=>{
    setisClient(true);
  },[])

  useEffect(()=>{
    if (loading && loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.messageSent)}
        />,
      );
    }
  },[loaded,loading]);


  /**
   * On submit handler
   * @method onSubmit
   * @param {Object} data Data object.
   * @returns {undefined}
   */
  const onSubmit=(data) =>{
    dispatch(emailNotification(
      data.from,
      data.message,
      data.name,
      data.subject,
    ));
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel=()=> {
    history.goBack();
  }
  
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

    return (
      <div id="contact-form">
        <Container id="view">
          <Helmet title={intl.formatMessage(messages.contactForm)} />
          {error && (
            <Message
              icon="warning"
              negative
              attached
              header={intl.formatMessage(messages.error)}
              content={error.message}
            />
          )}
          <Form
            onSubmit={onSubmit}
            onCancel={onCancel}
            formData={{ blocksLayoutFieldname: {} }}
            submitLabel={intl.formatMessage(messages.send)}
            resetAfterSubmit
            title={intl.formatMessage(messages.contactForm)}
            loading={loading}
            schema={{
              fieldsets: [
                {
                  fields: ['name', 'from', 'subject', 'message'],
                  id: 'default',
                  title: intl.formatMessage(messages.default),
                },
              ],
              properties: {
                name: {
                  title: intl.formatMessage(messages.name),
                  type: 'string',
                },
                from: {
                  title: intl.formatMessage(messages.from),
                  type: 'email',
                },
                subject: {
                  title: intl.formatMessage(messages.subject),
                  type: 'string',
                },
                message: {
                  title: intl.formatMessage(messages.message),
                  type: 'string',
                  widget: 'textarea',
                },
              },
              required: ['from', 'message'],
            }}
          />
          {isClient && (
            <Portal node={document.getElementById('toolbar')}>
              <Toolbar
                pathname={pathname}
                hideDefaultViewButtons
                inner={
                  <Link
                    to={`${getBaseUrl(pathname)}`}
                    className="item"
                  >
                    <Icon
                      name="arrow left"
                      size="big"
                      color="blue"
                      title={intl.formatMessage(messages.back)}
                    />
                  </Link>
                }
              />
            </Portal>
          )}
        </Container>
      </div>
    );
  }

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  ContactFormComponent.propTypes = {
    emailNotification: PropTypes.func,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    pathname: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  ContactFormComponent.defaultProps = {
    error: null,
    loading: null,
    loaded: null,
  };

export default compose( withRouter)(ContactFormComponent);
