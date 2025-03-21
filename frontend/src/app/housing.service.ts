import { Injectable } from '@angular/core';
import { environment } from "../environment";
import {HousingLocation} from "./housinglocation";

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  private apiUrl: string = `${environment.sample_apiUrl}/locations`;

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data: Response = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data: Response = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  constructor() {

  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}

