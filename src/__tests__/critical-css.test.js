import {
  hasCriticalCss,
  readCriticalCss,
  criticalCssPath,
} from '../critical-css';
import {
  renameSync,
  existsSync,
  mkdirSync,
  rmdirSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
} from 'fs';

const smallValidCssFileContents = '* { color: green; }';

describe('critical CSS module', () => {
  beforeEach(() => {
    let backupCriticalCssPath = 'critical.css.bak';
    if (existsSync(criticalCssPath)) {
      renameSync(criticalCssPath, backupCriticalCssPath);
    }
    // here there is no critical CSS file, tests must create it on their own
  });

  it('should not try to use critical CSS if no critical CSS file is given', () => {
    expect(hasCriticalCss()).toBe(false);
  });

  it('should not accept a directory as the critical CSS file', () => {
    mkdirSync(criticalCssPath, { recursive: true });

    expect(hasCriticalCss()).toBe(false);

    rmdirSync(criticalCssPath, { recursive: true });
  });

  it('should accept a valid CSS file as critical CSS', () => {
    writeFileSync(criticalCssPath, smallValidCssFileContents);

    expect(hasCriticalCss()).toBe(true);

    unlinkSync(criticalCssPath);
  });

  it('readCriticalCss should return null if there is no critical CSS file', () => {
    expect(readCriticalCss()).toBe(null);
  });

  it('readCriticalCss should return the contents of the valid given critical CSS file', () => {
    writeFileSync(criticalCssPath, smallValidCssFileContents);

    expect(readCriticalCss()).toBe(
      readFileSync(criticalCssPath, { encoding: 'utf-8' }),
    );

    unlinkSync(criticalCssPath);
  });

  afterEach(() => {
    // recover the old critical.css file if it existed
    if (existsSync('critical.css.bak')) {
      renameSync('critical.css.bak', criticalCssPath);
    }
  });
});
