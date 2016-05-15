/**
 * Search component.
 * @module components/Search
 */

import React from 'react';

/**
 * Search component class.
 * @function Search
 * @returns {string} Markup of the component.
 */
const Search = () => (
  <div id="portal-searchbox">
    <form id="searchGadget_form" action="http://localhost:8080/Plone18/@@search" role="search" data-pat-livesearch="ajaxUrl:http://localhost:8080/Plone18/@@ajax-search" className="pat-livesearch">
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

export default Search;
