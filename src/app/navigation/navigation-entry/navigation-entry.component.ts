import {AfterViewInit, Component, OnDestroy, input} from '@angular/core';
import {Route, RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";
import {ScrollTrigger} from "../../lib/misc/gsap/gsap";

@Component({
  selector: 'app-navigation-entry',
  imports: [
    NgStyle,
    RouterLink
  ],
  templateUrl: './navigation-entry.component.html'
})
export class NavigationEntryComponent implements AfterViewInit, OnDestroy {

  public readonly navigationEntry = input.required<Route>();
  public readonly navigationEntryIndex = input.required<number>();
  public readonly navigationLastEntry = input.required<boolean>();

  protected opacity: number = 0;

  private gsapScrollTrigger: ScrollTrigger | undefined;

  ngAfterViewInit(): void {
    this.gsapScrollTrigger = ScrollTrigger.create({
      trigger: `#${this.navigationEntry().path}`,
      start: 'top-=5 top',
      endTrigger: `#${this.navigationEntry().path}`,
      end: 'bottom-=5 top',
      scrub: true,
      onEnter: () => this.opacity = 1,
      onEnterBack: () => this.opacity = 1,
      onLeave: () => this.opacity = (this.navigationLastEntry() ? 1 : 0),
      onLeaveBack: () => this.opacity = 0
    });
  }

  ngOnDestroy(): void {
    this.gsapScrollTrigger?.kill();
  }

}
