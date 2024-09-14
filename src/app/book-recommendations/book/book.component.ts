import {Component, Input} from "@angular/core";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {BookModel} from "./models/book.model";

@Component({
  selector: 'app-book-recommendations-book',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './book.component.html'
})
export class BookRecommendationsBookComponent {

  @Input({required: true}) public bookIndex!: number;
  @Input({required: true}) public bookWidth!: number;
  @Input({required: true}) public bookDetails!: BookModel;

  protected isBookCoverOpen: boolean = false;

  protected toggleCoverOpen(): void {
    this.isBookCoverOpen = !this.isBookCoverOpen;
  }
}
