import { GetContentResponse } from '../content/get';
import { BlocksConfig } from '../config/Blocks';

export interface BlockViewProps {
  id: string;
  metadata?: GetContentResponse;
  properties: GetContentResponse;
  data: any;
  path: string;
  blocksConfig: BlocksConfig;
}
