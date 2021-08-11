import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  urlFiliere: string = `${api}/filieres`;
  urlClasse: string = `${api}/filieres/classes`;
  urlAnnee: string = `${api}/filieres/annee`;

  constructor(private http: HttpClient) {}

  getFilieres(): Observable<string[]> {
    return this.http.get<string[]>(this.urlFiliere);
  }
  getAnnes(): Observable<string[]> {
    return this.http.get<string[]>(this.urlAnnee);
  }
  getClasses(filiere): Observable<string[]> {
    return this.http.post<string[]>(this.urlClasse, filiere, httpOptions);
  }
}
