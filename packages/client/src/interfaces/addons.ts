interface Addon {
  description: string;
  profile_type: string;
  upgrade_profiles: Record<string, unknown>;
  uninstall_profile_id: string;
  other_profiles: any[];
  is_installed: string;
  id: string;
  install_profile: InstallProfile;
  title: string;
  uninstall_profile: UninstallProfile;
  install_profile_id: string;
  version: string;
  upgrade_info: Record<string, unknown>;
}

interface InstallProfile {
  product: string;
  description: string;
  for: string | null;
  title: string;
  pre_handler: string | null;
  version: string;
  type: number;
  id: string;
  post_handler: string | null;
}

interface UninstallProfile {
  product: string;
  description: string;
  for: string | null;
  title: string;
  pre_handler: string | null;
  type: number;
  id: string;
  post_handler: string | null;
}

export interface GetAddonsResponse {
  '@id': string;
  items: Addon[];
  items_total: number;
}

export interface GetAddonResponse extends Addon {
  '@id': string;
}
