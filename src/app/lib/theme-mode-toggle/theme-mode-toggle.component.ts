import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {ThemeModeToggleService} from "./theme-mode-toggle.service";
import {ThemeMode} from "./utils/theme-mode-toggle.enum";
import {THEME_MODE_STORAGE_SERVICE, ThemeModeLocalStorageService} from "./theme-mode-storage.service";
import {AsyncPipe, DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-theme-mode-toggle',
  standalone: true,
  providers: [
    {
      provide: THEME_MODE_STORAGE_SERVICE,
      useClass: ThemeModeLocalStorageService,
    },
  ],
  templateUrl: './theme-mode-toggle.component.html',
  imports: [
    AsyncPipe
  ]
})
export class ThemeModeToggleComponent implements AfterViewInit {

  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly angularDocument: Document = inject(DOCUMENT);

  private readonly themeModeToggleService: ThemeModeToggleService = inject(ThemeModeToggleService);

  @ViewChild('themeModeCheckbox')
  private readonly themeModeCheckbox!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.themeModeToggleService.init(this.renderer, this.angularDocument)
      .then((themeMode: ThemeMode) => this.renderer.setProperty(this.themeModeCheckbox.nativeElement, 'checked', themeMode === ThemeMode.DARK))
      .catch(error => console.error(error));
  }

  protected toggleThemeMode(): void {
    this.themeModeToggleService.initToggleThemeMode(this.renderer, this.angularDocument);
  }

}
