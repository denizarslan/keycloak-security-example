import {Component, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTable} from '@angular/material/table';
import {Movie, MovieBackendService} from 'src/app/services/movie-backend.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  movies: Movie[] = [];
  displayedColumns: string[] = ['title', 'director', 'year'];

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(
    private backend: MovieBackendService,
    private snackBar: MatSnackBar) {

  }

  getAllMovies(): void {
    this.backend.getAllMovies().subscribe(

        response => {
          this.movies = response;
          this.table?.renderRows();
        },

        error => {
          this.handleError(error.error);
        });
  }

  onMovieIdChange(event: any): void {
    this.getMovieById(event.value);
  }

  private getMovieById(id: number): void {
    this.backend.getMovieById(id).subscribe(

        response => {
          this.movies = [response];
          this.table?.renderRows();
        },

        error => {
          this.handleError(error.error);
        });
  }

  private handleError(error: any): void {
    this.displayError(error.code + ' ' + error.reason + '. ' + error.message);
  }

  private displayError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000});
  }

}
