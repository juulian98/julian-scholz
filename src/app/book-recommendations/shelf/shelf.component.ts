import {Component, Input} from "@angular/core";
import {NgClass, NgStyle} from "@angular/common";
import {BookRecommendationsBookComponent} from "../book/book.component";
import {BookModel} from "../book/models/book.model";

@Component({
  selector: 'app-book-recommendations-shelf',
  standalone: true,
  imports: [
    NgStyle,
    BookRecommendationsBookComponent,
    NgClass
  ],
  templateUrl: './shelf.component.html'
})
export class BookRecommendationsShelfComponent {

  @Input({required: true}) public shelfMarginLeft!: number;
  @Input({required: true}) public shelfMarginRight!: number;
  @Input({required: true}) public bookWidth!: number;
  @Input({required: true}) public bookGap!: number;
  @Input({required: true}) public bookDetails!: BookModel[];

}
