import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { EmploiService } from './services/emploi.service';

import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  connected: boolean = false;
  profConnected: boolean = false;
  user: User = {
    email: '',
    password: '',
  };
  erreur: boolean = false;
  login: boolean = true;
  @ViewChild('userForm') form: any;
  constructor(
    private notify: NotificationService,
    private emploiService: EmploiService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.connected = true;
    }
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    if (!valid) {
      this.notify.showError('Email or Password is not correct', 'Invalid');
    } else {
      if (value.email == 'walid@gmail.com' && value.password == '12345') {
        console.log('connected');
        localStorage.setItem('user', 'hgklsdqmrgerkaelkqf');
        this.connected = true;
        this.notify.showSuccess('You are connected successfuly!', 'Connected');
      } else {
        this.emploiService
          .loginProf({
            email: value.email,
            password: value.password,
          })
          .subscribe((res) => {
            if (res.message) {
              this.notify.showError(
                'Email or Password is not correct',
                'Invalid'
              );
            } else {
              localStorage.setItem('profEmploi', res.nom);
              this.profConnected = true;
              this.notify.showSuccess(
                `${res.nom} est connecté maintenant`,
                'Connecté'
              );
            }
          });
      }
      this.form.reset();
    }
  }
}
