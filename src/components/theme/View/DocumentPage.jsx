/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';

import {
  ViewTitleTile,
  ViewDescriptionTile,
  ViewTextTile,
  ViewImageTile,
} from '../../../components';

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentPage = ({ content }) =>
  content.tiles ? (
    <div id="page-document" className="ui wrapper">
      <Helmet title={content.title} />
      {map(content.arrangement.items, tile => {
        let Tile = null;
        switch (content.tiles[tile]['@type']) {
          case 'title':
            Tile = ViewTitleTile;
            break;
          case 'description':
            Tile = ViewDescriptionTile;
            break;
          case 'text':
            Tile = ViewTextTile;
            break;
          case 'image':
            Tile = ViewImageTile;
            break;
          default:
            break;
        }
        return Tile !== null ? (
          <Tile key={tile} properties={content} data={content.tiles[tile]} />
        ) : (
          <div>{JSON.stringify(content.tiles[tile]['@type'])}</div>
        );
      })}
    </div>
  ) : (
    <Container id="page-document">
      <Helmet title="Welcome to plone"/>
      <h1 className="documentFirstHeading">Welcome to Plone</h1>
        <p className="documentDescription">Congratulations! You have successfully installed Plone.</p>
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
        <p dangerouslySetInnerHTML={{ __html: `Welcome!

Learn more about Plone

If you're seeing this instead of the web site you were expecting, the owner of this web site has just installed Plone. Do not contact the Plone Team or the Plone support channels about this.
Get started

Before you start exploring your newly created Plone site, please do the following:

    Make sure you are logged in as an admin/manager user. (You should have a Site Setup entry in the user menu)
    Set up your mail server. (Plone needs a valid SMTP server to verify users and send out password reminders)
    Decide what security level you want on your site. (Allow self registration, password policies, etc)

Get comfortable

After that, we suggest you do one or more of the following:

    Find out What's new in Plone.
    Read the documentation.
    Follow a training.
    Explore the available add-ons for Plone.
    Read and/or subscribe to the support channels.
    Find out how others are using Plone.

Make it your own

Plone has a lot of different settings that can be used to make it do what you want it to. Some examples:

    Try out a different theme, either pick from the included ones, or one of the available themes from plone.org. (Make sure the theme is compatible with the version of Plone you are currently using)
    Decide what kind of workflow you want in your site. (The default is typical for a public web site; if you want to use Plone as a closed intranet or extranet, you can choose a different workflow.)
    By default, Plone uses a visual editor for content. (If you prefer text-based syntax and/or wiki syntax, you can change this in the markup control panel)
    …and many more settings are available in the Site Setup.

Tell us how you use it

Are you doing something interesting with Plone? Big site deployments, interesting use cases? Do you have a company that delivers Plone-based solutions?

    Add your company as a Plone provider.
    Add a success story describing your deployed project and customer.

Find out more about Plone

Plone is a powerful content management system built on a rock-solid application stack written using the Python programming language. More about these technologies:

    The Plone open source Content Management System web site for evaluators and decision makers.
    The Plone community web site for developers.
    The Python programming language web site.

Support the Plone Foundation

Plone is made possible only through the efforts of thousands of dedicated individuals and hundreds of companies. The Plone Foundation:

    …protects and promotes Plone.
    …is a registered 501(c)(3) charitable organization.
    …donations are tax-deductible.
    Support the Foundation and help make Plone better!

Thanks for using our product; we hope you like it!

—The Plone Team` 
        }}/>
    </Container>
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DocumentPage.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default DocumentPage;
