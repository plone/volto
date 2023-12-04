import type { GetContentResponse } from '../content/get';
import type { BlocksConfig } from '../config/Blocks';

export interface BlockViewProps {
  id: string;
  metadata?: GetContentResponse;
  properties: GetContentResponse;
  data: any;
  path: string;
  blocksConfig: BlocksConfig;
}
