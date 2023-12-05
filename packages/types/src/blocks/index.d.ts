import type { GetContentResponse } from '../content';
import type { BlocksConfig } from '../config/Blocks';

export interface BlockViewProps {
  id: string;
  metadata?: GetContentResponse;
  properties: GetContentResponse;
  data: any;
  path: string;
  blocksConfig: BlocksConfig;
}
