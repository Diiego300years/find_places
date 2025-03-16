import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Potrzebne dla *ngIf
import { SearchService } from '../search.service';
import { LanguageService } from '../language.service';
import { TranslationService } from '../translation.service'; // Dodano TranslationService

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>
      {{ translations['page.header'] || 'Domyślny nagłówek' }}
    </h1>
    <button (click)="fetchData()">{{ translations['page.copy'] || 'Domyślny tekst' }}</button>
    <p *ngIf="data">
      Dane z message mówią, że egzamin chyba zliczony: {{ data?.message }}
    </p>
  `,
  styles: ``
})
export class SearchComponent implements OnInit {
  currentLanguage!: 'pl' | 'en' | 'de';
  data: any;
  translations: { [key: string]: string } = {};

  constructor(
    private searchService: SearchService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang || 'pl';
      this.loadTranslations();
    });
  }

  // while app starting.
  ngOnInit(): void {
    // this.fetchData();
    this.loadTranslations();
  }

  /**
   * Simple fetch from api
   */
  fetchData(): void {
    this.searchService.fetchData().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }

  /**
   * Fetch language based on chose translations.
   */
  loadTranslations(): void {
    this.translationService.getTranslations().subscribe(translations => {
      this.translations = translations;
    });
  }
}
