import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PeliculasService {
  private apiKey = '461dd56fff4ce865ef92cc0c54f87e21';
  private urlMovieDB = 'https://api.themoviedb.org/3';

  peliculas: any[] = [];

  constructor(private jsonp: Jsonp) { }

  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);

    let desdeStr = `${desde.getFullYear()}-${desde.getMonth() + 1}-${desde.getDate()}`;
    let hastaStr = `${hasta.getFullYear()}-${hasta.getMonth() + 1}-${hasta.getDate()}`;

    let url = `${this.urlMovieDB}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    
    return this.jsonp.get(url)
      .pipe(map(res => {
        return res.json().results;
      }));
  }

  getPopulares() {
    let url = `${this.urlMovieDB}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    
    return this.jsonp.get(url)
      .pipe(map(res => {
        return res.json().results;
      }));
  }

  getPopularesNinos() {
    let url = `${this.urlMovieDB}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    
    return this.jsonp.get(url)
      .pipe(map(res => {
        return res.json().results;
      }));
  }

  buscarPelicula(texto: string) {
    let url = `${this.urlMovieDB}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url)
    .pipe(map(res => {
      this.peliculas = res.json().results;
      return res.json().results;
    }));
  }

  getPelicula(id: string) {
    let url = `${this.urlMovieDB}/movie/${id}?api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    
    return this.jsonp.get(url)
      .pipe(map(res => {
        return res.json();
      }));
  }
}
