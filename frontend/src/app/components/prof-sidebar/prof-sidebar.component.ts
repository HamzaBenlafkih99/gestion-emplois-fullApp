import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-sidebar',
  templateUrl: './prof-sidebar.component.html',
  styleUrls: ['./prof-sidebar.component.css'],
})
export class ProfSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  deleteToken() {
    localStorage.removeItem('profEmploi');
    window.location.reload();
  }
}
