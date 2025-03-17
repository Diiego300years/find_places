import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LanguageService } from './language.service';
import { TranslationService } from './translation.service';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

        <div class="second_nav">
          <button class="lang-btn" type="button" (click)="toggleLanguage()">
            {{ currentLanguage.toUpperCase() }}
          </button>
          <a [routerLink]="['search']" class="nav-link">
            <header>{{ translations['navigation'] || 'Search place' }}</header>
          </a>
        </div>
      </div>

      <section class="content">
        <h1>{{ translations['header'] || 'Opis domyślny' }}</h1>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  currentLanguage: 'de' | 'en' | 'pl' = 'pl';
  translations: { [key: string]: string } = {};
  currentPage: string = '/';

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router
  ) {
    // Łączymy strumienie: zmiany języka oraz zmiany trasy
    combineLatest([
      this.languageService.currentLanguage$,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects.split('/')[1] || '/')
      )
    ]).subscribe(([lang, page]) => {
      this.currentLanguage = lang;
      this.currentPage = page;
      // Wywołujemy zapytanie do backendu tylko raz przy nowej kombinacji język/trasa
      this.translationService.loadTranslations(this.currentPage, this.currentLanguage);
    });

    // Subskrypcja na aktualizację tłumaczeń (możesz ją umieścić tutaj lub w osobnym komponencie)
    this.translationService.getTranslations().subscribe(translations => {
      this.translations = translations;
    });
  }

  /**
   * Cycles through available languages in the order: ['pl', 'en', 'de'].
   * Uses the `LanguageService` to trigger language updates.
   */
  toggleLanguage(): void {
    const languages = ['pl', 'en', 'de'] as const;
    const currentIndex = languages.indexOf(this.currentLanguage);
    const newLanguage = languages[(currentIndex + 1) % languages.length];
    this.languageService.changeLanguage(newLanguage);
  }
}
