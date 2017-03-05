/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React from 'react';
import { browserHistory } from 'react-router';

/**
 * SearchWidget component class.
 * @function SearchWidget
 * @returns {string} Markup of the component.
 */
const SearchWidget = () => (
  <div id="portal-searchbox">
    <form id="searchGadget_form" action="" role="search" className="pat-livesearch" onSubmit={e => {
      browserHistory.push(`/search?SearchableText=${document.getElementById('searchGadget').value}`);
      e.preventDefault();
      return false;
    }}>
      <div className="LSBox">
        <label className="hiddenStructure" htmlFor="searchGadget">Search Site</label>

        <input name="SearchableText" type="text" size="18" id="searchGadget" title="Search Site" placeholder="Search Site" className="searchField" autoComplete="off" /><ul className="livesearch-results" style={{ display: 'none' }}></ul>

        <input className="searchButton" type="submit" value="Search" />

        <div className="searchSection">
          <input id="searchbox_currentfolder_only" className="noborder" type="checkbox" name="path" value="/Plone18" />
          <label htmlFor="searchbox_currentfolder_only" style={{ cursor: 'pointer' }}>only in current section</label>
        </div>
      </div>
    </form>
  </div>
);

export default SearchWidget;
