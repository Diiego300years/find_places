import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<!--    <p>details works! {{ housingLocationId }}</p>-->
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
    </article>

    <h1>Apply Now to live here!</h1>
    <br>
    <form [formGroup]="applicationForm" (ngSubmit)="submitApplication()">
      <label for="firstName">First Name:</label>
      <input id="firstName" formControlName="firstName" />

      <label for="lastName">Last Name:</label>
      <input id="lastName" formControlName="lastName" />

      <label for="email">Email:</label>
      <input id="email" formControlName="email" type="email" />

      <button type="submit">Submit</button>
    </form>
  `,
    styleUrls: ['./details.component.css'],
  styles: ``,
  standalone: true,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applicationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    })
  }

  submitApplication(){
    const firstName = this.applicationForm.value.firstName ?? '';
    const lastName = this.applicationForm.value.lastName ?? '';
    const email = this.applicationForm.value.email ?? '';
    // console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
    this.housingService.submitApplication(firstName, lastName, email);
  }
}


