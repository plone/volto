import { Button } from 'semantic-ui-react';

import config from '@plone/volto';

const coreButton = config.resolve('Button') || Button;

export default coreButton;
