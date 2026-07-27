import { Location } from '../router';
import type { Content } from '../content';
import { BlocksFormData } from '../blocks';

export type SlotPredicate = (args: any) => boolean;

export interface GetSlotArgs {
  content: Content;
  location: Location;
  navRoot?: Content;
  data?: BlocksFormData;
  [key: string]: unknown;
}

export type GetSlotReturn =
  | { component: SlotComponent['component']; name: string }[]
  | undefined;

export type SlotComponent = {
  component: React.ComponentType<any>;
  predicates?: SlotPredicate[];
};

export type SlotManager = {
  slots: string[];
  data: Record<string, SlotComponent[]>;
};

export type SlotsConfig = Record<string, SlotManager>;
