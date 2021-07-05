import { Component, OnInit } from '@angular/core';
import { ProfStatic } from '../../models/profStat';
import { EmploiService } from 'src/app/services/emploi.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css'],
})
export class RapportComponent implements OnInit {
  profs: ProfStatic[] = [];
  annee: number = 0;
  semestre: number = 0;
  departement: string = '';

  constructor(private profService: EmploiService) {}

  ngOnInit(): void {
    this.profs = JSON.parse(localStorage.getItem('statistic')).statistics;
  }

  setAnnee(value) {
    this.annee = value;
    if (this.semestre != 0 && this.departement != '') {
      this.profService
        .getProfs({ departement: this.departement.trim() })
        .subscribe((response) => {
          this.profs = response;
          this.profs.forEach((prf) => {
            this.profService
              .getStatistic({
                prof: prf.nom,
                semestre: this.semestre,
                annee: this.annee,
              })
              .subscribe((data) => {
                prf.nbrHeure = data;
                localStorage.setItem(
                  'statistic',
                  JSON.stringify({ statistics: this.profs })
                );
              });
          });
        });
    }
  }
  setSemestre(value) {
    this.semestre = value;
    if (this.annee != 0 && this.departement != '') {
      this.profService
        .getProfs({ departement: this.departement.trim() })
        .subscribe((response) => {
          this.profs = response;
          this.profs.forEach((prf) => {
            this.profService
              .getStatistic({
                prof: prf.nom,
                semestre: this.semestre,
                annee: this.annee,
              })
              .subscribe((data) => {
                prf.nbrHeure = data;
                localStorage.setItem(
                  'statistic',
                  JSON.stringify({ statistics: this.profs })
                );
              });
          });
        });
    }
  }
  setDepartement(value) {
    this.departement = value;
    if (this.semestre != 0 && this.annee != 0) {
      this.profService
        .getProfs({ departement: this.departement.trim() })
        .subscribe((response) => {
          this.profs = response;
          this.profs.forEach((prf) => {
            this.profService
              .getStatistic({
                prof: prf.nom,
                semestre: this.semestre,
                annee: this.annee,
              })
              .subscribe((data) => {
                prf.nbrHeure = data;
                localStorage.setItem(
                  'statistic',
                  JSON.stringify({ statistics: this.profs })
                );
              });
          });
        });
    }
  }
}
