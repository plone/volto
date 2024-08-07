import { Location } from 'history';
import type { Content } from '../content';

export type SlotPredicate = (args: any) => boolean;

export type GetSlotArgs = {
  content: Content;
  location: Location;
  navRoot?: Content;
};

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
