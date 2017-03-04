/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';

/**
 * Footer component class.
 * @function Field
 * @returns {string} Markup of the component.
 */
const Footer = () => (
  <footer className="plone-footer" id="portal-footer-wrapper" role="contentinfo">
    <div className="container" id="portal-footer">
      <div className="row">
        <div className="col-xs-12">

          <div className="portletWrapper" id="portletwrapper-706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a666f6f746572" data-portlethash="706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a666f6f746572">

            <section className="portlet portletClassic" id="portal-footer-signature">
              <div className="portletContent">
                The
                <a href="http://plone.com">Plone<sup>®</sup> Open Source CMS/WCM</a>
                is <abbr title="Copyright">©</abbr> 2000-2016 by the
                <a href="http://plone.org/foundation">Plone Foundation</a> and friends.

                Distributed under the
                <a href="http://creativecommons.org/licenses/GPL/2.0/">GNU GPL license</a>.
              </div>
            </section>

          </div>

          <div className="portletWrapper" id="portletwrapper-706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a616374696f6e73" data-portlethash="706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a616374696f6e73">

          <section className="portlet portletActions" role="menu">

            <section className="portletContent">
              <ul>

                  <li className="portletItem">
                    <a href="http://localhost:8080/Plone14/sitemap">

                      <span>Site Map</span>

                    </a>
                  </li>

                  <li className="portletItem">
                    <a href="http://localhost:8080/Plone14/accessibility-info">

                      <span>Accessibility</span>

                    </a>
                  </li>

                  <li className="portletItem">
                    <a href="http://localhost:8080/Plone14/contact-info" className="pat-plone-modal" data-pat-plone-modal="{}">

                      <span>Contact</span>

                    </a>
                  </li>

              </ul>
            </section>
          </section>

          </div>

          <div className="portletWrapper" id="portletwrapper-706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a636f6c6f70686f6e" data-portlethash="706c6f6e652e666f6f746572706f72746c6574730a636f6e746578740a2f506c6f6e6531340a636f6c6f70686f6e">
            <section className="portlet portletClassic" id="portal-colophon">
              <div className="portletContent">
                <a href="http://plone.com" target="_blank" title="This site was built using the Plone Open Source CMS/WCM.">Powered by Plone &amp; Python</a>
              </div>
            </section>
          </div>
        </div>
      </div>


    </div>
  </footer>
);

export default Footer;
