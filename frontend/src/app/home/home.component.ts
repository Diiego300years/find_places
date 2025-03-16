import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city or name" #filter />

        <!-- Lista rozwijana do wyboru kryterium -->
        <select #filterOption>
          <option value="city">City</option>
          <option value="name">Name</option>
        </select>

        <button class="primary" type="button" (click)="filterResults(filter.value, filterOption.value)">
          Search
        </button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredHousingLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})


export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocationList = housingLocationList;
    });

  }

  filterResults(searchText: string, filterOption: string): void {
    // trim can delete space or sth in text
    const trimmedText = searchText.trim().toLowerCase();

    if (!trimmedText) {
      this.filteredHousingLocationList = this.housingLocationList;
      return;
    }

    this.filteredHousingLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        filterOption === 'city'
          ? housingLocation?.city.toLowerCase().includes(trimmedText)
          : housingLocation?.name.toLowerCase().includes(trimmedText)
    );
  }
}

