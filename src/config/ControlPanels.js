import contentSVG from '@plone/volto/icons/content.svg';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import languageSVG from '@plone/volto/icons/language.svg';
import emailSVG from '@plone/volto/icons/email.svg';
import navSVG from '@plone/volto/icons/nav.svg';
import worldSVG from '@plone/volto/icons/world.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import megaphoneSVG from '@plone/volto/icons/megaphone.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import discussionSVG from '@plone/volto/icons/discussion.svg';
import securitySVG from '@plone/volto/icons/security.svg';
import groupSVG from '@plone/volto/icons/group.svg';
import userSVG from '@plone/volto/icons/user.svg';
import addonSVG from '@plone/volto/icons/add-on.svg';
import settingsSVG from '@plone/volto/icons/settings.svg';
import rulesSVG from '@plone/volto/icons/content-existing.svg';
import undoControlPanelSVG from '@plone/volto/icons/undo-control-panel.svg';
import linkSVG from '@plone/volto/icons/link.svg';

export const controlPanelsIcons = {
  default: settingsSVG,
  'dexterity-types': contentSVG,
  'date-and-time': calendarSVG,
  language: languageSVG,
  mail: emailSVG,
  navigation: navSVG,
  site: worldSVG,
  search: zoomSVG,
  socialmedia: megaphoneSVG,
  editing: editingSVG,
  imaging: imageSVG,
  markup: codeSVG,
  'moderate-comments': discussionSVG,
  security: securitySVG,
  users: userSVG,
  groups: groupSVG,
  addons: addonSVG,
  rules: rulesSVG,
  undo: undoControlPanelSVG,
  aliases: linkSVG,
};

export const filterControlPanels = (controlpanels) => {
  const HIDDEN_CONTROL_PANELS = ['markup', 'content-rules'];

  return controlpanels.filter(
    (controlpanel) =>
      !HIDDEN_CONTROL_PANELS.includes(controlpanel['@id'].split('/').pop()),
  );
};

// Filters props.controlpanel.schema to only valid/relevant fields
export const filterControlPanelsSchema = (controlpanel) => {
  const panelType = controlpanel['@id'].split('/').pop();

  const unwantedSettings = {
    language: ['display_flags', 'always_show_selector'],
    search: ['enable_livesearch'],
    site: [
      'display_publication_date_in_byline',
      'icon_visibility',
      'thumb_visibility',
      'no_thumbs_portlet',
      'no_thumbs_lists',
      'no_thumbs_summary',
      'no_thumbs_tables',
      'thumb_scale_portlet',
      'thumb_scale_listing',
      'thumb_scale_table',
      'thumb_scale_summary',
      'toolbar_position',
      'toolbar_logo',
      'default_page',
      'site_logo',
      'site_favicon',
      'site_favicon_mimetype',
      'exposeDCMetaTags',
      'enable_sitemap',
      'robots_txt',
      'webstats_js',
    ],
    editing: ['available_editors', 'default_editor', 'ext_editor'],
    imaging: [
      'highpixeldensity_scales',
      'quality_2x',
      'quality_3x',
      'picture_variants',
      'image_captioning',
    ],
  };

  // Creates modified version of properties object
  const newPropertiesObj = Object.fromEntries(
    Object.entries(controlpanel.schema.properties).filter(
      ([key, val]) => !(unwantedSettings[panelType] || []).includes(key),
    ),
  );
  // Filters props.controlpanel.schema.fieldsets.fields to only valid/relevant fields
  const filterFields = (fields) => {
    return fields.filter(
      (field) => !(unwantedSettings[panelType] || []).includes(field),
    );
  };
  // Creates modified version of fieldsets array
  const newFieldsets = controlpanel.schema.fieldsets.map((fieldset) => {
    return { ...fieldset, fields: filterFields(fieldset.fields) };
  });

  // Returns clone of props.controlpanel.schema, with updated properties/fieldsets
  return {
    ...controlpanel.schema,
    properties: newPropertiesObj,
    fieldsets: newFieldsets,
  };
};
