import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';
import { LanguageService } from '../language.service';
import { TranslationService } from '../translation.service';
// import {SearchDataModel} from "../types/search-data.model";
import { TranslationsInterface } from "../types/search-data.model";
import { Observable} from 'rxjs';


@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule],
  template: `
     <button (click)="fetchData()">
      {{ (translations$ | async)?.['copy_button'] || 'Kopiuj' }}
    </button>
    <p *ngIf="data">
      {{ (translations$ | async)?.['description'] || 'Dane pomyślnie skopiowane' }} {{ data?.message }}
    </p>
  `,
  styles: [``]
})
export class SearchComponent {
  // I should add interface here but there's coming messgae: test only
  data: any
  translations$: Observable<TranslationsInterface | null> = this.translationService.getTranslations();

    /**
   * Injects required services for data fetching, language switching, and translation handling.
   * @param searchService - Handles data fetching logic
   * @param languageService - Tracks the active language
   * @param translationService - Provides translated content for the UI
   */
  constructor(
    private searchService: SearchService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) {}

   /**
   * Fetches data from the `SearchService`.
   * Updates the `data` property with the response from the API.
   */
  fetchData(): void {
    this.searchService.fetchData().subscribe(response => {
      this.data = response;
      console.log("fetch leci", this.data);
    });
  }
}
