import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';
import { TranslationsInterface, LanguageInterface, SupportedLanguages } from '../app/types/search-data.model'


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = environment.apiUrl;

  // BehaviorSubject to store the latest translations
  private translations$: BehaviorSubject<TranslationsInterface | null> = new BehaviorSubject<TranslationsInterface | null>(null);
  private availableLanguages: LanguageInterface = {
    languages: ['pl', 'en', 'de']
  };

  constructor(private http: HttpClient) {}
  /**
   * Fetch translations from the API based on the page and language.
   * Stores the result in the `translations$` BehaviorSubject.
   */
  loadTranslations(page: string, lang: SupportedLanguages): void {

    if (!this.availableLanguages.languages.includes(lang as SupportedLanguages)) {
      console.error(`❌ Error: Unsupported language '${lang}'`);
      return;
    }

    page = page === '/' ? 'home' : page;
    const url = `${this.apiUrl}/${page}/${lang}`;

    this.http.get<TranslationsInterface>(url).pipe(
      catchError(err  => {
        console.error(`Error loading translations for page '${page}' in language '${lang}':`, err);
        return of(null);
      })
    ).subscribe(translations => {
      console.log(`TranslationsService received in TranslationService: `, translations);
      this.translations$.next(translations);
    });
  }

  /**
   * Get the latest translations as an observable for reactive updates.
   */
  getTranslations(): Observable<TranslationsInterface | null> {
  return this.translations$.asObservable();
  }
}
