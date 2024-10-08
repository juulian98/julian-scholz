import {AfterViewInit, Component, DestroyRef, inject} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {DOCUMENT, NgStyle} from "@angular/common";
import {fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-back-to-top-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgStyle
  ],
  templateUrl: './back-to-top-button.component.html'
})
export class BackToTopButtonComponent implements AfterViewInit {

  private readonly router: Router = inject(Router);
  private readonly angularDocument: Document = inject(DOCUMENT);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly faCaretUp: IconDefinition = faCaretUp;
  protected readonly radiusOuterCircle: number = 40;
  protected readonly offsetInnerCircle: number = 8;
  protected readonly radiusInnerCircle: number = this.radiusOuterCircle - this.offsetInnerCircle;

  protected readonly circumference: number = 2 * Math.PI * this.radiusInnerCircle;

  protected strokeDashoffset: number = this.calculateStrokeDashoffset(0);
  protected isVisible: boolean = false;

  ngAfterViewInit(): void {
    fromEvent(this.angularDocument.defaultView!, 'scroll')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(() => this.calculateStrokeDashoffsetWithScrollPosition());
  }

  protected navigateToTop(): void {
    this.router.navigate(['/']);
  }

  private calculateStrokeDashoffset(scrollPercentage: number): number {
    return this.circumference - (this.circumference * scrollPercentage) / 100;
  }

  protected calculateStrokeDashoffsetWithScrollPosition(): void {
    const scrollTopHeight = this.angularDocument.defaultView!.scrollY;
    const totalHeight = this.angularDocument.documentElement.scrollHeight - this.angularDocument.defaultView!.innerHeight;
    const scrollPercentage = Math.round((scrollTopHeight / totalHeight) * 100);
    this.strokeDashoffset = this.calculateStrokeDashoffset(scrollPercentage < 100 ? scrollPercentage : 100);

    this.isVisible = scrollPercentage >= 5;
  }

}
