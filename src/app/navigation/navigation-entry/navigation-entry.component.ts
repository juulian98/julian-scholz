import {
  AfterViewInit,
  Component,
  OnDestroy,
  input,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgStyle, ViewportScroller } from '@angular/common';
import { ScrollTrigger } from '../../lib/misc/gsap/gsap';
import { NavigationEntryModel } from './models/navigation-entry.model';

@Component({
  selector: 'app-navigation-entry',
  imports: [NgStyle],
  templateUrl: './navigation-entry.component.html',
})
export class NavigationEntryComponent implements AfterViewInit, OnDestroy {
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly viewportScroller: ViewportScroller =
    inject(ViewportScroller);

  public readonly navigationEntry = input.required<NavigationEntryModel>();
  public readonly navigationEntryIndex = input.required<number>();
  public readonly navigationLastEntry = input.required<boolean>();

  protected opacity = signal<number>(0);

  private gsapScrollTrigger: ScrollTrigger | undefined;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.gsapScrollTrigger = ScrollTrigger.create({
        trigger: `#${this.navigationEntry().id}`,
        start: 'top-=5 top',
        endTrigger: `#${this.navigationEntry().id}`,
        end: 'bottom-=5 top',
        scrub: true,
        onEnter: () => this.opacity.set(1),
        onEnterBack: () => this.opacity.set(1),
        onLeave: () => this.opacity.set(this.navigationLastEntry() ? 1 : 0),
        onLeaveBack: () => this.opacity.set(0),
      });
    }
  }

  protected navigateTo(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnDestroy(): void {
    this.gsapScrollTrigger?.kill();
  }
}
