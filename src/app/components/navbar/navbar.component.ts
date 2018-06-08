import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn: boolean;
loggedInUser: string;
showRegister: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  onLogoutClick () {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
