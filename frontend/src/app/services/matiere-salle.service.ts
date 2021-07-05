import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MatiereSalleService {
  matiereUrl: string = 'http://localhost:5000/matieres';
  salleUrl: string = 'http://localhost:5000/availbleSalle';
  profUrl: string = 'http://localhost:5000/availbleProf';
  groupeUrl: string = `http://localhost:5000/groupes/availble`;

  constructor(private http: HttpClient) {}

  getMatieres(data): Observable<string[]> {
    return this.http.post<string[]>(this.matiereUrl, data, httpOptions);
  }

  getSalles(data): Observable<string[]> {
    return this.http.post<string[]>(this.salleUrl, data, httpOptions);
  }

  getLocals(): Observable<string[]> {
    return this.http.get<string[]>(this.salleUrl);
  }

  getProfs(data): Observable<string[]> {
    return this.http.post<string[]>(this.profUrl, data, httpOptions);
  }

  getGroupes(data, fetchType): Observable<string[]> {
    return this.http.post<string[]>(
      this.groupeUrl + fetchType,
      data,
      httpOptions
    );
  }
}
