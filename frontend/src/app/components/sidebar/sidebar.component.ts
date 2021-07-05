import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  deleteToken() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  initializer() {
    //window.location.reload();
  }
}
