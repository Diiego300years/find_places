import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = environment.apiUrl;
  // BehaviorSubject to store the latest translations
  private translations$ = new BehaviorSubject<{ [key: string]: string }>({});


  constructor(private http: HttpClient) {}
  /**
   * Fetch translations from the API based on the page and language.
   * Stores the result in the `translations$` BehaviorSubject.
   */
  loadTranslations(page: string, lang: 'pl' | 'en' | 'de'): void {
    page = page === '/' ? 'home' : page;
    const url = `${this.apiUrl}/${page}/${lang}`;

    this.http.get<{ [key: string]: string }>(url).pipe(
      catchError(err  => {
        console.error(`Error loading translations for page '${page}' in language '${lang}':`, err);
        return of({});
      })
    ).subscribe(translations => {
      // is that subsvcribe good?
      console.log(`TranslationsService received in TranslationService: `, translations);
      this.translations$.next(translations);
    });
  }

  /**
   * Get the latest translations as an observable.
   */
  getTranslations(): Observable<{ [key: string]: string }> {
    return this.translations$.asObservable();
  }
}
