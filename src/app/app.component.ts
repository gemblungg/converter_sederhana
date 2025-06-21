import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Tambahkan ini
import { FormsModule } from '@angular/forms';   // <-- Tambahkan ini

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // --- Tambahkan properti `imports` di sini ---
  imports: [
    CommonModule, // Untuk *ngIf dan number pipe
    FormsModule   // Untuk [(ngModel)]
  ],
  standalone: true // Asumsi Anda menggunakan Angular versi baru dengan standalone components
})
export class AppComponent {
  title = 'unit-converter-app';

  // Distance
  distanceValue: number | null = null;
  distanceUnit: string = 'km';
  distanceConverted = {
    km: null as number | null,
    m: null as number | null,
    cm: null as number | null,
    mm: null as number | null
  };

  // Weight
  weightValue: number | null = null;
  weightUnit: string = 'kg';
  weightConverted = {
    kg: null as number | null,
    g: null as number | null,
    mg: null as number | null,
    ton: null as number | null
  };

  // Temperature
  temperatureValue: number | null = null;
  temperatureUnit: string = 'celsius';
  temperatureConverted = {
    celsius: null as number | null,
    fahrenheit: null as number | null,
    kelvin: null as number | null
  };

  constructor() {}

  // Distance Conversion
  convertDistance() {
    if (this.distanceValue === null) {
      this.resetDistanceResults();
      return;
    }

    let meters: number;

    switch (this.distanceUnit) {
      case 'km':
        meters = this.distanceValue * 1000;
        break;
      case 'm':
        meters = this.distanceValue;
        break;
      case 'cm':
        meters = this.distanceValue / 100;
        break;
      case 'mm':
        meters = this.distanceValue / 1000;
        break;
      default:
        meters = 0;
    }

    this.distanceConverted.km = meters / 1000;
    this.distanceConverted.m = meters;
    this.distanceConverted.cm = meters * 100;
    this.distanceConverted.mm = meters * 1000;
  }

  resetDistanceResults() {
    this.distanceConverted.km = null;
    this.distanceConverted.m = null;
    this.distanceConverted.cm = null;
    this.distanceConverted.mm = null;
  }

  // Weight Conversion
  convertWeight() {
    if (this.weightValue === null) {
      this.resetWeightResults();
      return;
    }

    let grams: number;

    switch (this.weightUnit) {
      case 'kg':
        grams = this.weightValue * 1000;
        break;
      case 'g':
        grams = this.weightValue;
        break;
      case 'mg':
        grams = this.weightValue / 1000;
        break;
      case 'ton':
        grams = this.weightValue * 1000 * 1000; // 1 ton = 1,000,000 grams
        break;
      default:
        grams = 0;
    }

    this.weightConverted.kg = grams / 1000;
    this.weightConverted.g = grams;
    this.weightConverted.mg = grams * 1000;
    this.weightConverted.ton = grams / 1000 / 1000;
  }

  resetWeightResults() {
    this.weightConverted.kg = null;
    this.weightConverted.g = null;
    this.weightConverted.mg = null;
    this.weightConverted.ton = null;
  }

  // Temperature Conversion
  convertTemperature() {
    if (this.temperatureValue === null) {
      this.resetTemperatureResults();
      return;
    }

    let celsius: number;

    switch (this.temperatureUnit) {
      case 'celsius':
        celsius = this.temperatureValue;
        break;
      case 'fahrenheit':
        celsius = (this.temperatureValue - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = this.temperatureValue - 273.15;
        break;
      default:
        celsius = 0;
    }

    this.temperatureConverted.celsius = celsius;
    this.temperatureConverted.fahrenheit = (celsius * 9 / 5) + 32;
    this.temperatureConverted.kelvin = celsius + 273.15;
  }

  resetTemperatureResults() {
    this.temperatureConverted.celsius = null;
    this.temperatureConverted.fahrenheit = null;
    this.temperatureConverted.kelvin = null;
  }
}