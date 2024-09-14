import {Injectable, InjectionToken} from "@angular/core";
import {ThemeMode} from "./utils/theme-mode-toggle.enum";

export const THEME_MODE_STORAGE_SERVICE = new InjectionToken<ThemeModeStorage>(
  "THEME_MODE_STORAGE",
  {
    providedIn: 'root',
    factory: () => new ThemeModeLocalStorageService()
  }
);

export interface ThemeModeStorage {
  save(mode: ThemeMode): void;

  get(): ThemeMode;
}

@Injectable()
export class ThemeModeLocalStorageService implements ThemeModeStorage {
  LOCAL_STORAGE_KEY = "themeMode";

  save(mode: ThemeMode): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, mode.toString());
  }

  get(): ThemeMode {
    return <ThemeMode>localStorage.getItem(this.LOCAL_STORAGE_KEY) || undefined;
  }
}
