import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';
import { LanguageService } from '../language.service';
import { TranslationService } from '../translation.service';

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
  data: any;
  // Tworzymy obserwowalny strumień tłumaczeń
  translations$ = this.translationService.getTranslations();

  constructor(
    private searchService: SearchService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) {}

  fetchData(): void {
    this.searchService.fetchData().subscribe(response => {
      this.data = response;
      console.log("fetch leci", this.data);
    });
  }
}
