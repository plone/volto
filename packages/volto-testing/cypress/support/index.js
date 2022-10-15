import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setup, teardown } from './reset-fixture';

beforeEach(function () {
  setup();
});

afterEach(function () {
  teardown();
});
