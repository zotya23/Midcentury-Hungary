import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './shared/services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';

type MyTheme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = true;
  showSuccessMessage: boolean = false;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  theme: MyTheme = 'dark';

  constructor(
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
    private themeService: ThemeService
  ) {
    this.titleService.setTitle('Mid-century Hungary');
  }
  toggleTheme(event: MatSlideToggleChange) {
    this.theme = event.checked ? 'dark' : 'light';
  }

  ngOnInit() {
    this.routes = this.router.config.map((conf) => conf.path) as string[];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((evts: any) => {
        const currentPage = (evts.urlAfterRedirects as string).split(
          '/'
        )[1] as string;
        if (this.routes.includes(currentPage)) {
          this.page = currentPage;
        }
      });
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        console.log(user);
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      },
      (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    );

    this.isDarkTheme = localStorage.getItem('theme')==="Dark" ? true : false;
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService
      .logout()
      .then(() => {
        this.showSuccessMessage = true;
        setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
        console.log('Logged out successfully.');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
  }
}
