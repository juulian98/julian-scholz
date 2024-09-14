import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Route, RouterLink} from "@angular/router";
import {AsyncPipe, NgStyle} from "@angular/common";
import {ScrollTrigger} from "../../lib/misc/gsap/gsap";

@Component({
  selector: 'app-navigation-entry',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './navigation-entry.component.html'
})
export class NavigationEntryComponent implements AfterViewInit, OnDestroy {

  @Input({required: true}) public navigationEntry!: Route;
  @Input({required: true}) public navigationEntryIndex!: number;
  @Input({required: true}) public navigationLastEntry!: boolean;

  protected opacity: number = 0;

  private gsapScrollTrigger: ScrollTrigger | undefined;

  ngAfterViewInit(): void {
    this.gsapScrollTrigger = ScrollTrigger.create({
      trigger: `#${this.navigationEntry.path}`,
      start: 'top-=5 top',
      endTrigger: `#${this.navigationEntry.path}`,
      end: 'bottom-=5 top',
      scrub: true,
      onEnter: () => this.opacity = 1,
      onEnterBack: () => this.opacity = 1,
      onLeave: () => this.opacity = (this.navigationLastEntry ? 1 : 0),
      onLeaveBack: () => this.opacity = 0
    });
  }

  ngOnDestroy(): void {
    this.gsapScrollTrigger?.kill();
  }

}
