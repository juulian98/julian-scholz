import {Route, Routes} from '@angular/router';
import {FavoritesComponent} from "./favorites/favorites.component";
import {VitaComponent} from "./vita/vita.component";
import {BookRecommendationsComponent} from "./book-recommendations/book-recommendations.component";

const routeIds = ["bookRecommendations", "vita", "favorites"] as const;
type RouteId = typeof routeIds[number];

export const routeEntries: Record<RouteId, Route> = {
  "bookRecommendations": {
    title: 'Buchtipps',
    path: 'book-recommendations',
    component: BookRecommendationsComponent,
    data: {index: 0}
  },
  "vita": {title: 'Vita', path: 'vita', component: VitaComponent, data: {index: 1}},
  "favorites": {title: 'Favoriten', path: 'favorites', component: FavoritesComponent, data: {index: 2}},
} as const;

export const routes: Routes = Object.values(routeEntries);
