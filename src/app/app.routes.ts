import { NavigationEntryModel } from './navigation/navigation-entry/models/navigation-entry.model';

type RouteId = 'bookRecommendations' | 'vita' | 'favorites';

export const navigationEntries: Record<RouteId, NavigationEntryModel> = {
  bookRecommendations: {
    id: 'book-recommendations',
    title: 'Buchtipps',
    index: 0,
  },
  vita: {
    id: 'vita',
    title: 'Vita',
    index: 1,
  },
  favorites: {
    id: 'favorites',
    title: 'Favoriten',
    index: 2,
  },
} as const;
