import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export interface VitaEntryModel {
  iconDefinition: IconDefinition;
  title: string;
  titleDescription?: string;
  location: string;
  timePeriod: string;
  description: string;
}
