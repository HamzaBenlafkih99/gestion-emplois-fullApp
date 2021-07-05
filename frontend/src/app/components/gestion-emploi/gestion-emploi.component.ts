import { Component, OnInit } from '@angular/core';
import { EmploiService } from 'src/app/services/emploi.service';
import { MatiereSalleService } from '../../services/matiere-salle.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-gestion-emploi',
  templateUrl: './gestion-emploi.component.html',
  styleUrls: ['./gestion-emploi.component.css'],
})
export class GestionEmploiComponent implements OnInit {
  emplois = [];
  annee: number = 0;
  semestre: number = 1;
  salles: string[] = [];
  salle: string = '';

  constructor(
    private profService: EmploiService,
    private salleService: MatiereSalleService
  ) {}

  setAnnee(value) {
    this.annee = value;
  }
  setSemestre(value) {
    this.semestre = value;
  }

  ngOnInit(): void {
    this.annee = JSON.parse(localStorage.getItem('emploiSalle')).annee;
    this.salle = JSON.parse(localStorage.getItem('emploiSalle')).salle;
    this.semestre = JSON.parse(localStorage.getItem('emploiSalle')).semestre;
    this.emplois[0] = JSON.parse(
      localStorage.getItem('emploiSalle')
    ).salleEmploi;
  }

  getAllSalles() {
    this.salleService.getLocals().subscribe((response) => {
      this.salles = response;
    });
  }
  setSalle(value) {
    this.salle = value;
    this.getEmploi(this.annee, this.semestre, value);
  }

  getEmploi(annee, semestre, salle) {
    this.profService
      .getSalleEmploi({
        annee,
        semestre,
        salle,
      })
      .subscribe((response) => {
        this.emplois[0] = response;
        localStorage.setItem(
          'emploiSalle',
          JSON.stringify({
            salleEmploi: response,
            annee,
            semestre,
            salle: this.salle,
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
