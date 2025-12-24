import { ConfigType } from '@plone/registry';

import {
  minLengthValidator,
  maxLengthValidator,
  urlValidator,
  emailValidator,
  isNumberValidator,
  maximumValidator,
  minimumValidator,
  isIntegerValidator,
  maxItemsValidator,
  minItemsValidator,
  hasUniqueItemsValidator,
  startEventDateRangeValidator,
  endEventDateRangeValidator,
  patternValidator,
} from '@plone/volto/helpers/FormValidation/validators';

const registerValidators = (config: ConfigType) => {
  config.registerUtility({
    name: 'minLength',
    type: 'validator',
    dependencies: { fieldType: 'string' },
    method: minLengthValidator,
  });

  config.registerUtility({
    name: 'maxLength',
    type: 'validator',
    dependencies: { fieldType: 'string' },
    method: maxLengthValidator,
  });

  config.registerUtility({
    name: 'pattern',
    type: 'validator',
    dependencies: { fieldType: 'string' },
    method: patternValidator,
  });

  config.registerUtility({
    name: 'minLength',
    type: 'validator',
    dependencies: { fieldType: 'password' },
    method: minLengthValidator,
  });

  config.registerUtility({
    name: 'maxLength',
    type: 'validator',
    dependencies: { fieldType: 'password' },
    method: maxLengthValidator,
  });

  config.registerUtility({
    name: 'pattern',
    type: 'validator',
    dependencies: { fieldType: 'password' },
    method: patternValidator,
  });

  config.registerUtility({
    name: 'email',
    type: 'validator',
    dependencies: { widget: 'email' },
    method: emailValidator,
  });

  config.registerUtility({
    name: 'url',
    type: 'validator',
    dependencies: { widget: 'url' },
    method: urlValidator,
  });

  config.registerUtility({
    name: 'number',
    type: 'validator',
    dependencies: { fieldType: 'number' },
    method: isNumberValidator,
  });

  config.registerUtility({
    name: 'minimum',
    type: 'validator',
    dependencies: { fieldType: 'number' },
    method: minimumValidator,
  });

  config.registerUtility({
    name: 'maximum',
    type: 'validator',
    dependencies: { fieldType: 'number' },
    method: maximumValidator,
  });

  config.registerUtility({
    name: 'integer',
    type: 'validator',
    dependencies: { fieldType: 'integer' },
    method: isIntegerValidator,
  });

  config.registerUtility({
    name: 'minimum',
    type: 'validator',
    dependencies: { fieldType: 'integer' },
    method: minimumValidator,
  });

  config.registerUtility({
    name: 'maximum',
    type: 'validator',
    dependencies: { fieldType: 'integer' },
    method: maximumValidator,
  });

  config.registerUtility({
    name: 'maxItems',
    type: 'validator',
    dependencies: { fieldType: 'array' },
    method: maxItemsValidator,
  });

  config.registerUtility({
    name: 'minItems',
    type: 'validator',
    dependencies: { fieldType: 'array' },
    method: minItemsValidator,
  });

  config.registerUtility({
    name: 'uniqueItems',
    type: 'validator',
    dependencies: { fieldType: 'array' },
    method: hasUniqueItemsValidator,
  });

  config.registerUtility({
    name: 'dateRangeValidator',
    type: 'validator',
    dependencies: { behaviorName: 'plone.eventbasic', fieldName: 'start' },
    method: startEventDateRangeValidator,
  });

  config.registerUtility({
    name: 'dateRangeValidator',
    type: 'validator',
    dependencies: { behaviorName: 'plone.eventbasic', fieldName: 'end' },
    method: endEventDateRangeValidator,
  });
};

export { registerValidators };
