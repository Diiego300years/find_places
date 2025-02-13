import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <main>
      <div class="nav">
        
        <a [routerLink]="['/']">
          <header class="brand-name">
            <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
          </header>
        </a>
        <a [routerLink]="['exam']" class="exam">
          <header class="second_nav">Egzamin
          </header>
        </a>
        </div>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}

