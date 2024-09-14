export interface BookModel {
  url: string;
  backfaceColor: string;
  cover: {
    imagePath: string;
    height: number;
  };
  details: {
    author: string;
    title: string;
    subtitle: string;
    summary: string;
  }
}
