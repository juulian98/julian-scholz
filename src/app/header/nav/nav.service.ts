import { Injectable } from '@angular/core';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXing,
} from '@fortawesome/free-brands-svg-icons';
import { NavEntryModel } from './models/nav-entry.model';

@Injectable({ providedIn: 'root' })
export class NavService {
  private readonly _navEntries: Record<string, NavEntryModel> = {
    linkedIn: {
      name: 'LinkedIn',
      iconDefinition: faLinkedin,
      url: 'https://www.linkedin.com/in/julian-scholz',
      order: 0,
    },
    xing: {
      name: 'XING',
      iconDefinition: faXing,
      url: 'https://www.xing.com/profile/Julian_Scholz2103',
      order: 1,
    },
    gitHub: {
      name: 'GitHub',
      iconDefinition: faGithub,
      url: 'https://github.com/julian-scholz',
      order: 2,
    },
    instagram: {
      name: 'Instagram',
      iconDefinition: faInstagram,
      url: 'https://www.instagram.com/juuuulian98',
      order: 3,
    },
  };

  public get sortedNavEntries(): NavEntryModel[] {
    return Object.entries(this._navEntries)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([, navEntry]) => navEntry);
  }
}
