import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import {TranslationService} from "../translation.service";
import {LanguageService} from "../language.service";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form class="d-flex align-items-center gap-2">
        <input
            type="text"
            [placeholder]="(translations$ | async)?.['search'] || 'Search'"

            #filter />

        <!-- Lista rozwijana do wyboru kryterium -->
        <select class="form-select w-auto" #filterOption>
          <option value="city">
            {{ (translations$ | async)?.['city'] || 'City' }}</option>
          <option value="name">
            {{ (translations$ | async)?.['name'] || 'Name' }}
          </option>
        </select>
        <button class="primary" type="button" (click)="filterResults(filter.value, filterOption.value)">
      {{ (translations$ | async)?.['search'] || 'Szukaj' }}

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

  translations$ = this.translationService.getTranslations();

  constructor(
      private translationService: TranslationService,
      private languageService: LanguageService,
      private housingService: HousingService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocationList = housingLocationList;
    });
  }

    /**
   * Filters the housing locations based on the provided criteria.
   *
   * @param searchText - The text entered in the search field.
   * @param filterOption - The selected filter criteria ('city' or 'name').
   */
  filterResults(searchText: string, filterOption: string): void {
    // trim can delete space or sth in text
    const trimmedText = searchText.trim().toLowerCase();

    if (!trimmedText) {
      this.filteredHousingLocationList = this.housingLocationList;
      return;
    }

    this.filteredHousingLocationList = this.housingLocationList.filter(
      (housingLocation: HousingLocation) =>
        filterOption === 'city'
          ? housingLocation?.city?.toLowerCase().includes(trimmedText)
          : housingLocation?.name?.toLowerCase().includes(trimmedText)
    );
  }
}
