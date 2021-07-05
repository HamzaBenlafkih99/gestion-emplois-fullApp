import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  urlFiliere: string = 'http://localhost:5000/filieres';
  urlClasse: string = 'http://localhost:5000/filieres/classes';
  urlAnnee: string = 'http://localhost:5000/filieres/annee';

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
