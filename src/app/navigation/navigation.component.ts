import {AfterViewInit, Component, OnDestroy, signal} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faJs} from '@fortawesome/free-brands-svg-icons'
import {NgStyle} from "@angular/common";
import {ThemeModeToggleComponent} from "../lib/theme-mode-toggle/theme-mode-toggle.component";
import {Route, RouterLink} from "@angular/router";
import {routeEntries} from "../app.routes";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {NavigationEntryComponent} from "./navigation-entry/navigation-entry.component";
import {ScrollTrigger} from "../lib/misc/gsap/gsap";


@Component({
  selector: 'app-navigation',
  imports: [
    FontAwesomeModule,
    NgStyle,
    ThemeModeToggleComponent,
    RouterLink,
    NavigationEntryComponent
  ],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnDestroy {

  protected readonly faJs: IconDefinition = faJs;
  protected readonly routeEntries = routeEntries;

  protected navbarExpanded = signal<number>(0);

  private gsapScrollTrigger: ScrollTrigger | undefined;

  get sortedRouteEntries(): Route[] {
    return Object.entries(this.routeEntries)
      .sort((a, b) => a[1].data!['index'] - b[1].data!['index'])
      .map(([_, route]) => route);
  }

  ngAfterViewInit(): void {
    this.gsapScrollTrigger = ScrollTrigger.create({
      trigger: 'header',
      scrub: true,
      onEnter: () => this.navbarExpanded.set(0),
      onEnterBack: () => this.navbarExpanded.set(0),
      onLeave: () => this.navbarExpanded.set(1),
      onLeaveBack: () => this.navbarExpanded.set(1)
    });
  }

  ngOnDestroy(): void {
    this.gsapScrollTrigger?.kill();
  }

}
