import { ConfigType } from '@plone/registry';

import {
  minLengthValidator,
  maxLengthValidator,
  urlValidator,
  emailValidator,
  isNumber,
  maximumValidator,
  minimumValidator,
  isInteger,
  hasUniqueItems,
  startEventDateRangeValidator,
  endEventDateRangeValidator,
} from '@plone/volto/helpers/FormValidation/validators';

const registerValidators = (config: ConfigType) => {
  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['default', 'minLength'],
    component: minLengthValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['default', 'maxLength'],
    component: maxLengthValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['email', 'isValidEmail'],
    component: emailValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['url', 'isValidURL'],
    component: urlValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['number', 'isNumber'],
    component: isNumber,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['number', 'minimum'],
    component: minimumValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['number', 'maximum'],
    component: maximumValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['integer', 'isNumber'],
    component: isInteger,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['integer', 'minimum'],
    component: minimumValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['integer', 'maximum'],
    component: maximumValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['array', 'uniqueItems'],
    component: hasUniqueItems,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['plone.eventbasic', 'start'],
    component: startEventDateRangeValidator,
  });

  config.registerComponent({
    name: 'fieldValidator',
    dependencies: ['plone.eventbasic', 'end'],
    component: endEventDateRangeValidator,
  });
};

export { registerValidators };
