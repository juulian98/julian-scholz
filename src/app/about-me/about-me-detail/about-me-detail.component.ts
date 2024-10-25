import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {AboutMeDetailModel} from "./models/about-me-detail.model";
import {ScrollTrigger} from "../../lib/misc/gsap/gsap";

@Component({
  selector: 'app-about-me-detail',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './about-me-detail.component.html'
})
export class AboutMeDetailComponent implements AfterViewInit, OnDestroy {

  @Input({required: true}) public scrollTrigger!: HTMLElement;
  @Input({required: true}) public detail!: AboutMeDetailModel;
  @Input({required: true}) public ppc!: number;

  protected active: number = 0;

  private gsapScrollTrigger: ScrollTrigger | undefined;

  ngAfterViewInit(): void {
    this.gsapScrollTrigger = ScrollTrigger.create({
      trigger: this.scrollTrigger,
      start: `top top-=${this.detail.start * this.ppc}`,
      end: `top top-=${this.detail.end * this.ppc}`,
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
