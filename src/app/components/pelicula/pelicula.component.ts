import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html'
})
export class PeliculaComponent implements OnInit {
  pelicula: any;
  regresarA: string;
  busqueda: string;

  constructor(private route: ActivatedRoute, private _ps: PeliculasService) {
    this.route.params.subscribe(params => {
      this.regresarA = params['pag'];

      if (params['busqueda']) {
        this.busqueda = params['busqueda'];
      }

      this._ps.getPelicula(params['id']).subscribe(pelicula => {
        this.pelicula = pelicula;
      });
    });
  }

  ngOnInit() {
  }

}
