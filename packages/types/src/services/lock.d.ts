export interface LockInfo {
  locked: boolean;
  stealable: boolean;
}

export interface CreateLockResponse {
  created: string;
  creator: string;
  creator_name: string;
  creator_url: string;
  locked: boolean;
  name: string;
  stealable: boolean;
  time: number;
  timeout: number;
  token: string;
}
