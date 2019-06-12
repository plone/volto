import More from '@plone/volto/components/manage/Toolbar/More';
import PersonalTools from '@plone/volto/components/manage/Toolbar/PersonalTools';
import Types from '@plone/volto/components/manage/Toolbar/Types';
import PersonalInformation from '@plone/volto/components/manage/Preferences/PersonalInformation';
import StandardWrapper from '@plone/volto/components/manage/Toolbar/StandardWrapper';

export const defaultToolbarComponents = {
  personalTools: { component: PersonalTools, wrapper: null },
  more: { component: More, wrapper: null },
  types: { component: Types, wrapper: null },
  profile: {
    component: PersonalInformation,
    wrapper: StandardWrapper,
    hideToolbarBody: true,
  },
};
