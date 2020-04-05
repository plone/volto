// Globally in your .storybook/preview.js.
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withConsole } from '@storybook/addon-console';

addDecorator(withInfo({ inline: true }));
addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
