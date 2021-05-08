export interface TvShows {
  id: number;
  //TV Show ID

  title: string;
  //TV Show title

  release_date: Date;
  //TV Show release date

  last_aired_date: string;
  //TV Show last episode date

  number_seasons: number;
  //Number of seasons of the tv show

  number_episodes: number;
  //Number of episodes of the tv show

  overview: string;
  //TV Show description

  cover_url: string;
  //TV Show url image

  trailer_url: string;
  //TV Show url trailer

  directed_by: string;
  //Name of who directed the tv show

  phase: string;
  //Phase to which the tv show belongs

  saga: string;
  //Saga to which the tv show belongs
}
