import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<'pl' | 'en' | 'de'>('pl');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  /**
   * Zmiana języka i aktualizacja strumienia danych
   */
  changeLanguage(lang: 'pl' | 'en' | 'de'): void {
    console.log(`🌍 Changing language to: ${lang}`);
    this.currentLanguageSubject.next(lang); // 🔥 Aktualizuje język
  }

  /**
   * Zwraca aktualny język (synchronnie)
   */
  getCurrentLanguage(): 'pl' | 'en' | 'de' {
    return this.currentLanguageSubject.getValue();
  }
}
