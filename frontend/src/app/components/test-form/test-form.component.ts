import { Component, OnInit, ViewChild } from '@angular/core';
import { Emploie } from '../../models/Emploie';
import { FiliereService } from 'src/app/services/filiere.service';
import { MatiereSalleService } from 'src/app/services/matiere-salle.service';
import { EmploiService } from 'src/app/services/emploi.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
})
export class TestFormComponent implements OnInit {
  emploie: Emploie = {
    annee: '',
    filiere: '',
    classe: '',
    semestre: '',
    jour: '',
    heure: '',
    matiere: '',
    type: '',
    debut: 0,
    fin: 0,
    salle: '',
    prof: '',
    groupe: '',
  };

  @ViewChild('userForm') form: any;

  seances: any;
  errors: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  removed: boolean = false;
  annees: string[] = [];
  emplois = [];
  filieres: string[] = [];
  filiereSelectione: String = '';

  classes: string[] = [];
  classeSelectionne: string = '';

  annee: number = 0;
  semestres = [1, 2];
  semestre: number = 0;
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  jour: string = '';
  jrr: string = '';
  heure: string = '';
  heures = [
    '8h:00-9h:55',
    '10h:10-12h:00',
    '12h:10 -14h:00',
    '14h:00-15h:55',
    '16h:10-18h:00',
  ];
  type: string = '';
  debut: number = 0;
  fin: number = 0;

  matieres: string[] = [];
  matiereSelectionne: string = '';

  salles: string[] = [];
  salleSelectionne: string = '';

  profs: string[] = [];
  profSelectionne: string = '';

  groupes: string[] = [];
  groupeSelectionne: string = '';

  constructor(
    private filiereService: FiliereService,
    private matiereService: MatiereSalleService,
    private emploiService: EmploiService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {}
  getAnnees() {
    this.filiereService.getAnnes().subscribe((response) => {
      this.annees = response;
    });
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
    if (this.semestre != 0 && this.annee != 0) {
      this.getEmploi(this.annee, this.semestre, value);
    }
  }
  /*--------------- horaire section ---------------------*/
  setAnnee(value) {
    this.annee = value;
    if (this.classeSelectionne != '' && this.semestre != 0) {
      this.getEmploi(value, this.semestre, this.classeSelectionne.trim());
    }
  }
  setSemestre(value) {
    this.semestre = value;
    if (this.classeSelectionne != '' && this.annee != 0) {
      this.getEmploi(this.annee, value, this.classeSelectionne.trim());
    }
  }
  setJour(value) {
    this.jour = value;
  }
  setHeure(value) {
    this.heure = value;
  }
  setType(value) {
    this.type = value;
  }
  setDebut(value) {
    this.debut = value;
  }
  setFin(value) {
    this.fin = value;
  }

  /*--------------- Matiere section -----------------------*/
  getAllMatieres() {
    this.matiereService
      .getMatieres({
        semestre: this.semestre,
        classe: this.classeSelectionne.trim(),
      })
      .subscribe((response) => {
        this.matieres = response;
      });
  }
  setMatiere(value) {
    this.matiereSelectionne = value;
  }
  /*--------------- Salle section -----------------------*/
  getAllSalles() {
    let config = {};
    if (this.debut != 0 && this.fin != 0) {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        jour: this.jour.trim(),
        heure: this.heure.trim(),
        debut: this.debut,
        fin: this.fin,
      };
    } else {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        jour: this.jour.trim(),
        heure: this.heure.trim(),
      };
    }
    this.matiereService.getSalles(config).subscribe((response) => {
      this.salles = response;
    });
  }
  setSalle(value) {
    this.salleSelectionne = value;
  }

  /*--------------- Prof section -----------------------*/
  getAllProfs() {
    let config = {};
    if (this.debut != 0 && this.fin != 0) {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        matiere: this.matiereSelectionne.trim(),
        jour: this.jour.trim(),
        heure: this.heure.trim(),
        debut: this.debut,
        fin: this.fin,
        type: this.type.trim(),
      };
    } else {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        matiere: this.matiereSelectionne.trim(),
        jour: this.jour.trim(),
        heure: this.heure.trim(),
        type: this.type.trim(),
      };
    }
    this.matiereService.getProfs(config).subscribe((response) => {
      if (response.length == 0) {
        this.notifyService.showError(
          `les Profs de module : +${this.matiereSelectionne} n'est pas disponible`,
          'Error'
        );
        setTimeout(
          function () {
            this.errors = false;
          }.bind(this),
          3000
        );
      } else {
        this.profs = response;
      }
    });
  }
  setProf(value) {
    this.profSelectionne = value;
  }
  /*--------------- Groupes section -----------------------*/

  getAllGroupes() {
    let fetchType = '';
    let config = {};
    if (this.filiereSelectione.includes('Cycle')) {
      fetchType = 'cp';
    } else {
      fetchType = 'ci';
    }
    console.log(fetchType);

    if (this.debut != 0 && this.fin != 0) {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        classe: this.classeSelectionne,
        jour: this.jour,
        heure: this.heure,
        debut: this.debut,
        fin: this.fin,
        type: this.type,
      };
    } else {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        classe: this.classeSelectionne,
        jour: this.jour,
        heure: this.heure,
        type: this.type,
      };
    }
    console.log(config);
    this.matiereService.getGroupes(config, fetchType).subscribe((response) => {
      this.groupes = response;
      if (response.length == 0) {
        this.errors = true;
        this.errorMessage = "Un groupe de cette classe n'est pas disponible";
        this.notifyService.showError(
          "Un groupe de cette classe n'est pas disponible",
          'Error'
        );
        setTimeout(
          function () {
            this.errors = false;
          }.bind(this),
          3000
        );
      }
    });
  }
  setGroupe(value) {
    this.groupeSelectionne = value;
  }

  valider(
    annee,
    semestre,
    classe,
    jour,
    heure,
    matiere,
    type,
    groupe,
    prof,
    salle
  ): boolean {
    if (
      annee &&
      semestre &&
      classe &&
      jour &&
      heure &&
      matiere &&
      type &&
      groupe &&
      prof &&
      salle
    ) {
      return true;
    } else {
      return false;
    }
  }

  addSeance(e) {
    this.notifyService.showSuccess('Séance ajoutée avec succès', 'emplois');
    e.preventDefault();
    let config = {};
    if (
      this.debut != 0 &&
      this.fin != 0 &&
      this.valider(
        this.annee,
        this.semestre,
        this.classeSelectionne,
        this.jour,
        this.heure,
        this.matiereSelectionne,
        this.type,
        this.groupeSelectionne,
        this.profSelectionne,
        this.salleSelectionne
      )
    ) {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        classe: this.classeSelectionne,
        jour: this.jour,
        heure: this.heure,
        matiere: this.matiereSelectionne,
        type: this.type,
        groupe: this.groupeSelectionne,
        prof: this.profSelectionne,
        salle: this.salleSelectionne,
        debut: this.debut,
        fin: this.fin,
      };
    } else {
      config = {
        annee: this.annee,
        semestre: this.semestre,
        classe: this.classeSelectionne,
        jour: this.jour,
        heure: this.heure,
        matiere: this.matiereSelectionne,
        type: this.type,
        groupe: this.groupeSelectionne,
        prof: this.profSelectionne,
        salle: this.salleSelectionne,
      };
    }
    this.emploiService.addEmploi(config).subscribe((response) => {
      console.log(response);
      this.getEmploi(this.annee, this.semestre, this.classeSelectionne);
    });

    this.jour = '';
    this.heure = '';
    this.matiereSelectionne = '';
    this.debut = 0;
    this.fin = 0;
    this.salleSelectionne = '';
    this.profSelectionne = '';
    this.groupeSelectionne = '';
  }

  getEmploi(annee, semestre, classe) {
    this.emploiService
      .getEmploi({
        annee,
        semestre,
        classe,
      })
      .subscribe((response) => {
        console.log(response);
        this.emplois[0] = response;
      });
  }

  removeSeance(id) {
    this.notifyService.showSuccess('Séance Supprimée avec succès', 'Success');
    this.emploiService
      .deleteEmploi({
        id,
      })
      .subscribe((response) => {
        this.getEmploi(this.annee, this.semestre, this.classeSelectionne);
      });
  }
}
