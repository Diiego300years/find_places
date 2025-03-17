import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SearchDataModel} from '../app/types/search-data.model';
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = `${environment.apiUrl}/search_page`;

  constructor(private http: HttpClient) {}
  fetchData(): Observable<any> {
    // Automatyczne pobranie języka z przeglądarki lub ustawienie domyślnego
    const userLang = navigator.language || 'pl';

    // Dodanie nagłówka `Accept-Language`
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': userLang
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
