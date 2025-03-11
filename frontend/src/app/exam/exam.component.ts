import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Potrzebne dla *ngIf
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule], // Ważne w standalone components!
  template: `
    <p>
      Exam works!
    </p>
    <button (click)="fetchData()">Pobierz dane</button>
    <p *ngIf="data">Dane z message mówią, że egzamin chyba zliczony: {{ data }}</p>
  `,
  styles: ``
})
export class ExamComponent {
  data: any;

  constructor(private examService: ExamService) {}

  fetchData() {
    this.examService.fetchData().subscribe((response) => {
      this.data = response.message; // Jeśli API zwraca { message: "Egzamin zdany" }, pobieramy wartość
      console.log(this.data);
    });
  }
}
