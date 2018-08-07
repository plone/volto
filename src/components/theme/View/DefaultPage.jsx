/**
 * Document view component.
 * @module components/theme/View/DefaultPage
 */
import React from 'react';

/**
 * Component to display the default document view.
 * @function DefaultPage
 * @returns {string} Markup of the component.
 */

const DefaultPage = () => {
    return {
    __html : `
          <h1>Welcome!</h1>
          <p><a href="http://plone.com" target="_blank">Learn more about Plone</a></p>
          <p>If you're seeing this instead of the web site you were expecting, the owner of this web site has just installed Plone. Do not contact the Plone Team or the Plone support channels about this.</p>
          <h2>Get started</h2>
          <p>Before you start exploring your newly created Plone site, please do the following:</p>
          <ol>
            <li>Make sure you are logged in as an admin/manager user. (You should have a Site Setup entry in the user menu)</li>
            <li><a href="http://localhost:8080/Plone/@@mail-controlpanel" target="_blank">Set up your mail server</a>. (Plone needs a valid SMTP server to verify users and send out password reminders)</li>
            <li><a href="http://localhost:8080/Plone/@@security-controlpanel" target="_blank">Decide what security level you want on your site</a>. (Allow self registration, password policies, etc)</li>
          </ol>
          <h2>Get comfortable</h2>
          <p>After that, we suggest you do one or more of the following:</p>
          <ul>
            <li>Find out <a href="http://plone.com/features/" target="_blank">What's new in Plone</a>.</li>
            <li>Read the <a href="http://docs.plone.org" target="_blank">documentation</a>.</li>
            <li>Follow a <a href="https://training.plone.org" target="_blank">training</a>.</li>
            <li>Explore the <a href="https://plone.org/download/add-ons" target="_blank">available add-ons</a> for Plone.</li>
            <li>Read and/or subscribe to the <a href="http://plone.org/support" target="_blank">support channels</a>.</li>
            <li>Find out <a href="http://plone.com/success-stories" target="_blank">how others are using Plone</a>.</li>
          </ul>
          <h2>Make it your own</h2>
          <p>Plone has a lot of different settings that can be used to make it do what you want it to. Some examples:</p>
          <ul>
            <li>Try out a different theme, either pick from <a href="http://localhost:8080/Plone/@@theming-controlpanel" target="_blank">the included ones</a>, or one of the <a href="http://plone.org/products/" target="_blank">available themes from plone.org</a>. (Make sure the theme is compatible with the version of Plone you are currently using)</li>
            <li><a href="http://localhost:8080/Plone/@@content-controlpanel" target="_blank">Decide what kind of workflow you want in your site.</a> (The default is typical for a public web site; if you want to use Plone as a closed intranet or extranet, you can choose a different workflow.)</li>
            <li>By default, Plone uses a visual editor for content. (If you prefer text-based syntax and/or wiki syntax, you can change this in the <a href="http://localhost:8080/Plone/@@markup-controlpanel" target="_blank">markup control panel</a>)</li>
            <li>…and many more settings are available in the <a href="http://localhost:8080/Plone/@@overview-controlpanel" target="_blank">Site Setup</a>.</li>
          </ul>
          <h2>Tell us how you use it</h2>
          <p>Are you doing something interesting with Plone? Big site deployments, interesting use cases? Do you have a company that delivers Plone-based solutions?</p>
          <ul>
            <li>Add your company as a <a href="http://plone.com/providers" target="_blank">Plone provider</a>.</li>
            <li>Add a <a href="http://plone.com/success-stories" target="_blank">success story</a> describing your deployed project and customer.</li>
          </ul>
          <h2>Find out more about Plone</h2>
          <p>Plone is a powerful content management system built on a rock-solid application stack written using the Python programming language. More about these technologies:</p>
          <ul>
            <li>The <a href="http://plone.com" target="_blank">Plone open source Content Management System</a> web site for evaluators and decision makers.</li>
            <li>The <a href="http://plone.org" target="_blank">Plone community </a>web site for developers.</li>
            <li>The <a href="http://www.python.org" target="_blank">Python programming language</a> web site.</li>
          </ul>
          <h2>Support the Plone Foundation</h2>
          <p>Plone is made possible only through the efforts of thousands of dedicated individuals and hundreds of companies. The Plone Foundation:</p>
          <ul>
            <li>…protects and promotes Plone.</li>
            <li>…is a registered 501(c)(3) charitable organization.</li>
            <li>…donations are tax-deductible.</li>
            <li><a href="https://plone.org/sponsors/be-a-hero" target="_blank">Support the Foundation and help make Plone better!</a></li>
          </ul>
          <p>Thanks for using our product; we hope you like it!</p>
          <p>—The Plone Team</p>`
        }
      }

export default DefaultPage