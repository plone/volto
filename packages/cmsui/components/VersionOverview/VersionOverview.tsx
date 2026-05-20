import PackageJson from '../../package.json';

interface VersionOverviewProps {
  plone_version: string;
  cmf_version: string;
  python_version: string;
  zope_version: string;
  debug_mode: string;
  pil_version: string;
  plone_gs_metadata_version_file_system: string;
  plone_gs_metadata_version_installed: string;
  '@id': string;
  upgrade: boolean;
}

const VersionOverview = ({
  plone_version,
  cmf_version,
  python_version,
  zope_version,
  debug_mode,
  pil_version,
  plone_gs_metadata_version_file_system,
  plone_gs_metadata_version_installed,
  ['@id']: id,
  upgrade,
}: VersionOverviewProps) => {
  const sevenVersion = PackageJson.version;
  return (
    <div className="versionoverview-container">
      <h2>Version Overview</h2>
      <ul>
        <li>Seven: {sevenVersion}</li>
        <li>Plone Version: {plone_version}</li>
        <li>CMF Version: {cmf_version}</li>
        <li>Python Version: {python_version}</li>
        <li>Zope Version: {zope_version}</li>
        <li>Debug Mode: {debug_mode}</li>
        <li>PIL Version: {pil_version}</li>
        <li>Upgrade Available: {upgrade ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
};
export default VersionOverview;
