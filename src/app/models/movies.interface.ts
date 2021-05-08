export interface Movies {
  id: number;
  //Movie ID

  title: string;
  //Movie title

  release_date: Date;
  //Movie release date

  box_office: number;
  //Movie box office

  overview: string;
  //Movie description

  cover_url: string;
  //Movie url image

  trailer_url: string;
  //Movie url trailer

  directed_by: string;
  //Name of who directed the movie

  phase: string;
  //Phase to which the movie belongs

  saga: string;
  //Saga to which the movie belongs

  chronology: number;
  //Position of the //movie in chronological order

  post_credit_scenes: number;
  //Number of post-credit scenes in the //movie
}
