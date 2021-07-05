import { Component, OnInit } from '@angular/core';
import { ProfStatic } from '../../models/profStat';
import { EmploiService } from 'src/app/services/emploi.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-prof-dashboard',
  templateUrl: './prof-dashboard.component.html',
  styleUrls: ['./prof-dashboard.component.css'],
})
export class ProfDashboardComponent implements OnInit {
  emplois = [];
  annee: number = 0;
  semestre: number = 1;
  departement: string = '';
  profs: ProfStatic[] = [];
  prof: string = 'M. BOUARIFI Walid';

  constructor(private profService: EmploiService) {}

  ngOnInit(): void {
    this.annee = JSON.parse(localStorage.getItem('emploiProf')).annee;
    this.prof = JSON.parse(localStorage.getItem('profEmploi')).prof;
    this.semestre = JSON.parse(localStorage.getItem('emploiProf')).semestre;
    this.emplois[0] = JSON.parse(localStorage.getItem('emploiProf')).profEmploi;
  }

  setAnnee(value) {
    this.annee = value;
  }
  setSemestre(value) {
    this.semestre = value;
    this.getEmploi(this.annee, value, this.prof);
  }

  getEmploi(annee, semestre, prof) {
    this.profService
      .getProfEmploi({
        annee,
        semestre,
        prof,
      })
      .subscribe((response) => {
        this.emplois[0] = response;
        localStorage.setItem(
          'emploiProf',
          JSON.stringify({
            profEmploi: response,
            annee,
            semestre,
            prof: this.prof,
          })
        );
      });
  }

  download() {
    var element = document.getElementById('empls');

    html2canvas(element).then((canvas) => {
      var imageData = canvas.toDataURL('image/png');
      var doc: any = new jsPDF();
      var imgHeight = (canvas.height * 206) / canvas.width;
      doc.addImage(imageData, 2, 2, 206, imgHeight);
      doc.save('emplois.pdf');
    });
  }
}
