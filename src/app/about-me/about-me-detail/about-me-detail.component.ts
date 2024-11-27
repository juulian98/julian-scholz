import {AfterViewInit, Component, OnDestroy, input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {AboutMeDetailModel} from "./models/about-me-detail.model";
import {ScrollTrigger} from "../../lib/misc/gsap/gsap";

@Component({
  selector: 'app-about-me-detail',
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './about-me-detail.component.html'
})
export class AboutMeDetailComponent implements AfterViewInit, OnDestroy {

  public readonly scrollTrigger = input.required<HTMLElement>();
  public readonly detail = input.required<AboutMeDetailModel>();
  public readonly ppc = input.required<number>();

  protected active: number = 0;

  private gsapScrollTrigger: ScrollTrigger | undefined;

  ngAfterViewInit(): void {
    this.gsapScrollTrigger = ScrollTrigger.create({
      trigger: this.scrollTrigger(),
      start: `top top-=${this.detail().start * this.ppc()}`,
      end: `top top-=${this.detail().end * this.ppc()}`,
      scrub: true,
      onEnter: () => this.active = 1,
      onEnterBack: () => this.active = 0,
      onLeave: () => this.active = 1,
      onLeaveBack: () => this.active = 0
    });
  }

  ngOnDestroy(): void {
    this.gsapScrollTrigger?.kill();
  }

}
