import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/services/filiere.service';
import { EmploiService } from 'src/app/services/emploi.service';
import { NotificationService } from '../../services/notification.service';
import { numbers } from '../../models/Number';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-class-emploi',
  templateUrl: './class-emploi.component.html',
  styleUrls: ['./class-emploi.component.css'],
})
export class ClassEmploiComponent implements OnInit {
  emplois = [];
  filieres: string[] = [];
  filiereSelectione: String = '';
  numbers: any = numbers;

  annee: number = 0;
  semestre: number = 1;
  classes: string[] = [];
  classeSelectionne: string = '';

  constructor(
    private filiereService: FiliereService,
    private emploiService: EmploiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  setAnnee(value) {
    this.annee = value;
  }
  setSemestre(value) {
    this.semestre = value;
  }

  /*--------------- Filiere section --------------------*/
  getAllFilieres() {
    this.filiereService.getFilieres().subscribe((response) => {
      this.filieres = response;
    });
  }
  setFiliere(value) {
    this.filiereSelectione = value;
  }
  /*--------------- Class section -----------------------*/
  getAllClasses() {
    this.filiereService
      .getClasses({ nom: this.filiereSelectione.trim() })
      .subscribe((response) => {
        this.classes = response;
      });
  }
  setClasse(value) {
    this.classeSelectionne = value;
    this.getEmploi(this.annee, this.semestre, value);
  }

  getEmploi(annee, semestre, classe) {
    this.emploiService
      .getEmploi({
        annee,
        semestre,
        classe,
      })
      .subscribe((response) => {
        this.emplois[0] = response;
        console.log(this.emplois[0]);
        localStorage.setItem(
          'emploiClasse',
          JSON.stringify({
            classeEmploi: response,
            annee,
            semestre,
            classe,
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
