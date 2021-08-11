import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../environments/api';
import { ProfStatic } from '../models/profStat';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EmploiService {
  addUrl: string = `${api}/addSeance`;
  getUrl: string = `${api}/emploie`;
  deleteUrl: string = `${api}/addSeance/delete`;

  constructor(private http: HttpClient) {}

  addEmploi(data): Observable<string> {
    return this.http.post<string>(this.addUrl, data, httpOptions);
  }
  getEmploi(data): Observable<any> {
    return this.http.post<any>(this.getUrl, data, httpOptions);
  }
  deleteEmploi(data): Observable<any> {
    return this.http.post<any>(this.deleteUrl, data, httpOptions);
  }
  /*--------------- prof section --------------------------*/

  getProfUrl: string = 'http://localhost:5000/availbleProf/prof';
  loginUri: string = 'http://localhost:5000/availbleProf/login';
  getStatisticfUrl: string = 'http://localhost:5000/availbleProf/statistics';
  profEmploiUrl: string = 'http://localhost:5000/emploie/prof';
  repeatedSeanceUri: string = 'http://localhost:5000/emploie/repeated';

  getProfs(departement): Observable<ProfStatic[]> {
    return this.http.post<ProfStatic[]>(
      this.getProfUrl,
      departement,
      httpOptions
    );
  }
  getStatistic(prof): Observable<number> {
    return this.http.post<number>(this.getStatisticfUrl, prof, httpOptions);
  }

  getProfEmploi(data): Observable<any> {
    return this.http.post<any>(this.profEmploiUrl, data, httpOptions);
  }

  getNumber(data): Observable<any> {
    return this.http.post<any>(this.repeatedSeanceUri, data, httpOptions);
  }

  loginProf(data): Observable<any> {
    return this.http.post<any>(this.loginUri, data, httpOptions);
  }

  /*--------------- Salle section --------------------------*/
  salleEmploiUrl: string = 'http://localhost:5000/emploie/salle';

  getSalleEmploi(data): Observable<any> {
    return this.http.post<any>(this.salleEmploiUrl, data, httpOptions);
  }
}
