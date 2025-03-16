import { Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../housinglocation';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="listing">
      <img
          class="listing-photo"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Check more!</a>    
    </section>
   `,
    styleUrls: ['./housing-location.component.css'],
  styles: ``

})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

}

