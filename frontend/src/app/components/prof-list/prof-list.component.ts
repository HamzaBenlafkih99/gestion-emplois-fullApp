import { Component, OnInit } from '@angular/core';
import { EmploiService } from 'src/app/services/emploi.service';

@Component({
  selector: 'app-prof-list',
  templateUrl: './prof-list.component.html',
  styleUrls: ['./prof-list.component.css'],
})
export class ProfListComponent implements OnInit {
  profs = [];
  constructor(private profService: EmploiService) {}

  ngOnInit(): void {
    this.profService
      .getProfs({ departement: 'Informatique' })
      .subscribe((response) => {
        this.profs = response;
      });
  }
}
