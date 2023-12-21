import type { Content } from '../content';
import type { BlocksConfig } from '../config/Blocks';

export interface BlockViewProps {
  id: string;
  metadata?: Content;
  properties: Content;
  data: any;
  path: string;
  blocksConfig: BlocksConfig;
}
