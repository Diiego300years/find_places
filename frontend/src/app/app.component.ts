import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LanguageService } from './language.service';
import { TranslationService } from './translation.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {LanguageInterface, TranslationsInterface, SupportedLanguages} from "./types/search-data.model";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
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
            <header> {{ (translations$ | async)?.['navigation']  || 'Search place' }}</header>
          </a>
        </div>
      </div>

      <section class="content">
        <h1>{{ (translations$ | async)?.['header']  || 'Opis domyślny' }}</h1>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  currentLanguage: 'de' | 'en' | 'pl' = 'pl';
  translations$: Observable<TranslationsInterface | null> = this.translationService.getTranslations();

  // without async pipe
  // translations: TranslationsInterface | null = null;
  currentPage: string = '/';
  languages: LanguageInterface['languages'] = ['pl', 'en', 'de'];

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router
  ) {
    // Connect stream: change language & rout
    combineLatest([
      this.languageService.currentLanguage$,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects.split('/')[1] || '/')
      )
    ]).subscribe(([lang, page]) => {
      this.currentLanguage = lang;
      this.currentPage = page;
      // Ask backend once if new language-route connection
      this.translationService.loadTranslations(this.currentPage, this.currentLanguage);
    });

    // Subcribcion for translation actualization without async pipe
    // this.translationService.getTranslations().subscribe(translations => {
    //   this.translations = translations;
    // });
  }

  /**
   * Cycles through available languages in the order: ['pl', 'en', 'de'].
   * Uses the `LanguageService` to trigger language updates.
   */
  toggleLanguage(): void {
    this.languageService.currentLanguage$.pipe(
    take(1) // Używamy `take(1)`, aby pobrać tylko jedną wartość z `currentLanguage$`.
  ).subscribe(currentLang => {
    const newLang: SupportedLanguages = this.languages[(this.languages.indexOf(currentLang) + 1) % this.languages.length];
      this.languageService.changeLanguage(newLang);
  });
  }
}
