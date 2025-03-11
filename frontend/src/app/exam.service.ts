import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private url = 'http://localhost:8585/api_v1/hello';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {

    return this.http.get(this.url) ?? {'message': 'no data'};
  }
}
