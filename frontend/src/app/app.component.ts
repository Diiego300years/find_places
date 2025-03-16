import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LanguageService } from './language.service';
import { TranslationService } from './translation.service';
import { filter } from 'rxjs/operators';

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
    // Subscribe to language changes and update translations
    this.languageService.currentLanguage$.subscribe(lang => {

      console.log(` Zaktualizowano język w languageService na: ${lang}`);
      this.currentLanguage = lang;
      this.translationService.loadTranslations(this.currentPage, lang);
    });


    // Automatically load translations when the route changes
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.currentPage = event.urlAfterRedirects.split('/')[1] || '/';
          this.translationService.loadTranslations(this.currentPage, this.languageService.getCurrentLanguage());
      });

    // Subscribe to translation updates
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
