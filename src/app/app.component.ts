import {AfterViewInit, Component, inject, ViewContainerRef, viewChild} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FavoritesComponent} from "./favorites/favorites.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {routeEntries} from "./app.routes";
import {VitaComponent} from "./vita/vita.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {BackToTopButtonComponent} from "./back-to-top-button/back-to-top-button.component";
import {ModalService} from "./modals/modal.service";
import {FaConfig} from '@fortawesome/angular-fontawesome';
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";
import {BookRecommendationsComponent} from "./book-recommendations/book-recommendations.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FavoritesComponent,
    NavigationComponent,
    VitaComponent,
    AboutMeComponent,
    BackToTopButtonComponent,
    BookRecommendationsComponent
  ],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.loaderParams?.['dynamicWidth']) {
          return `${config.src}-${config.width ? config.width : '1920'}w.${config.loaderParams?.['imageFormat']}`;
        } else {
          return `${config.src}.${config.loaderParams?.['imageFormat']}`;
        }
      }
    }
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  private readonly faConfig: FaConfig = inject(FaConfig);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly modalContainer = viewChild.required('modalContainer', { read: ViewContainerRef });

  protected readonly routeEntries = routeEntries;

  constructor() {
    this.faConfig.autoAddCss = false;
  }

  ngAfterViewInit(): void {
    this.modalService.setViewContainerRef(this.modalContainer());
  }

}
