import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'progettoConsap';
  // backgroundImage: string;

  // constructor(private router: Router) {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     if (event.url === '/home') {
  //       this.backgroundImage = 'none';
  //     } else {
  //       this.backgroundImage = "url('https://www.repstatic.it/content/contenthub/img/2022/05/05/130019707-9ea07e6f-71d0-474f-81f6-84c2aa7a633d.jpg')";
  //     }
  //   });
  // }
}
