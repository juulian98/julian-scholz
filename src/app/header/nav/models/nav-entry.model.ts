import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface NavEntryModel {
  name: string;
  iconDefinition: IconDefinition;
  url: string;
  order: number;
}
