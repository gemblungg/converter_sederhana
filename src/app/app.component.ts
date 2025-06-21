import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for Angular directives like *ngIf and pipes like 'number'
import { FormsModule } from '@angular/forms';   // Required for two-way data binding with [(ngModel)]

@Component({
  selector: 'app-root',             // The HTML tag used to embed this component (e.g., <app-root></app-root>)
  templateUrl: './app.component.html', // Path to the component's HTML template
  styleUrls: ['./app.component.css'],  // Path to the component's CSS styles
  imports: [
    CommonModule, // Provides common directives (like *ngIf) and pipes (like 'number')
    FormsModule   // Enables Angular's template-driven forms, particularly [(ngModel)]
  ],
  standalone: true // Declares this as a standalone component, simplifying module management
})
export class AppComponent {
  title = 'unit-converter-app'; // Title displayed in the application

  // --- Properties for Distance Conversion ---
  // Stores the user's input value for distance
  distanceValue: number | null = null;
  // Stores the currently selected unit for distance (default: kilometers)
  distanceUnit: string = 'km';
  // Object to hold all converted distance values, initialized to null
  distanceConverted = {
    km: null as number | null,
    m: null as number | null,
    cm: null as number | null,
    mm: null as number | null
  };

  // --- Properties for Weight Conversion ---
  // Stores the user's input value for weight
  weightValue: number | null = null;
  // Stores the currently selected unit for weight (default: kilograms)
  weightUnit: string = 'kg';
  // Object to hold all converted weight values, initialized to null
  weightConverted = {
    kg: null as number | null,
    g: null as number | null,
    mg: null as number | null,
    ton: null as number | null // Metric ton
  };

  // --- Properties for Temperature Conversion ---
  // Stores the user's input value for temperature
  temperatureValue: number | null = null;
  // Stores the currently selected unit for temperature (default: Celsius)
  temperatureUnit: string = 'celsius';
  // Object to hold all converted temperature values, initialized to null
  temperatureConverted = {
    celsius: null as number | null,
    fahrenheit: null as number | null,
    kelvin: null as number | null
  };

  // --- NEW PROPERTIES for Number Base Conversion ---
  // Input for number base conversion, as a string to handle hex and binary formats
  numBaseValue: string | null = null;
  // Currently selected input base unit (e.g., 'decimal', 'binary', 'hex', 'bcd')
  numBaseUnit: string = 'decimal';
  // Object to hold all converted number base values, initialized to null
  numBaseConverted = {
    decimal: null as number | null,
    binary: null as string | null,
    hex: null as string | null,
    bcd: null as string | null
  };
  // Property to store error messages for number base conversion
  numBaseError: string | null = null;

  // Constructor: Used for dependency injection. Empty for this application as no services are injected.
  constructor() {}

  // --- Logic for Distance Conversion ---
  convertDistance() {
    // If the input value is null (empty), reset all conversion results and stop
    if (this.distanceValue === null) {
      this.resetDistanceResults();
      return;
    }

    let meters: number; // Base unit for distance conversion (meters)

    // Convert the input value to meters based on the selected unit
    switch (this.distanceUnit) {
      case 'km':
        meters = this.distanceValue * 1000; // Kilometers to meters
        break;
      case 'm':
        meters = this.distanceValue; // Meters (already base unit)
        break;
      case 'cm':
        meters = this.distanceValue / 100; // Centimeters to meters
        break;
      case 'mm':
        meters = this.distanceValue / 1000; // Millimeters to meters
        break;
      default:
        meters = 0; // Fallback for unknown units
    }

    // Calculate and store the converted values for all distance units
    this.distanceConverted.km = meters / 1000;
    this.distanceConverted.m = meters;
    this.distanceConverted.cm = meters * 100;
    this.distanceConverted.mm = meters * 1000;
  }

  // Resets all stored distance conversion results to null
  resetDistanceResults() {
    this.distanceConverted.km = null;
    this.distanceConverted.m = null;
    this.distanceConverted.cm = null;
    this.distanceConverted.mm = null;
  }

  // --- Logic for Weight Conversion ---
  convertWeight() {
    // If the input value is null, reset all conversion results and stop
    if (this.weightValue === null) {
      this.resetWeightResults();
      return;
    }

    let grams: number; // Base unit for weight conversion (grams)

    // Convert the input value to grams based on the selected unit
    switch (this.weightUnit) {
      case 'kg':
        grams = this.weightValue * 1000; // Kilograms to grams
        break;
      case 'g':
        grams = this.weightValue; // Grams (already base unit)
        break;
      case 'mg':
        grams = this.weightValue / 1000; // Milligrams to grams
        break;
      case 'ton':
        grams = this.weightValue * 1000 * 1000; // Metric tons to grams (1 ton = 1,000 kg = 1,000,000 g)
        break;
      default:
        grams = 0; // Fallback for unknown units
    }

    // Calculate and store the converted values for all weight units
    this.weightConverted.kg = grams / 1000;
    this.weightConverted.g = grams;
    this.weightConverted.mg = grams * 1000;
    this.weightConverted.ton = grams / 1000 / 1000;
  }

  // Resets all stored weight conversion results to null
  resetWeightResults() {
    this.weightConverted.kg = null;
    this.weightConverted.g = null;
    this.weightConverted.mg = null;
    this.weightConverted.ton = null;
  }

  // --- Logic for Temperature Conversion ---
  convertTemperature() {
    // If the input value is null, reset all conversion results and stop
    if (this.temperatureValue === null) {
      this.resetTemperatureResults();
      return;
    }

    let celsius: number; // Base unit for temperature conversion 

    // Convert the input value to Celsius based on the selected unit
    switch (this.temperatureUnit) {
      case 'celsius':
        celsius = this.temperatureValue; // Celsius (already base unit)
        break;
      case 'fahrenheit':
        celsius = (this.temperatureValue - 32) * 5 / 9; // Fahrenheit to Celsius
        break;
      case 'kelvin':
        celsius = this.temperatureValue - 273.15; // Kelvin to Celsius
        break;
      default:
        celsius = 0; // Fallback for unknown units
    }

    // Calculate and store the converted values for all temperature units
    this.temperatureConverted.celsius = celsius;
    this.temperatureConverted.fahrenheit = (celsius * 9 / 5) + 32;
    this.temperatureConverted.kelvin = celsius + 273.15;
  }

  // Resets all stored temperature conversion results to null
  resetTemperatureResults() {
    this.temperatureConverted.celsius = null;
    this.temperatureConverted.fahrenheit = null;
    this.temperatureConverted.kelvin = null;
  }

  // --- NEW LOGIC for Number Base Conversion (Hex, Binary, BCD, Decimal) ---
  convertNumBase() {
    this.numBaseError = null;       // Reset any previous error message
    this.resetNumBaseResults();     // Reset all conversion results first

    // If input is null or empty after trimming, do nothing
    if (this.numBaseValue === null || this.numBaseValue.trim() === '') {
      return;
    }

    // Trim whitespace and convert to uppercase for consistent hex parsing
    const inputValue = this.numBaseValue.trim().toUpperCase();

    let decimalValue: number | null = null; // Base unit for number base conversion (decimal)

    try {
      // Convert the input string to its decimal equivalent based on the selected input unit
      switch (this.numBaseUnit) {
        case 'decimal':
          // Validate if input contains only digits for decimal
          if (!/^\d+$/.test(inputValue)) {
            throw new Error('Invalid decimal number. Only digits 0-9 are allowed.');
          }
          decimalValue = parseInt(inputValue, 10); // Parse as base 10
          break;
        case 'binary':
          // Validate if input contains only 0s and 1s for binary
          if (!/^[01]+$/.test(inputValue)) {
            throw new Error('Invalid binary number. Only digits 0-1 are allowed.');
          }
          decimalValue = parseInt(inputValue, 2); // Parse as base 2
          break;
        case 'hex':
          // Validate if input contains valid hex characters (0-9, A-F)
          if (!/^[0-9A-F]+$/.test(inputValue)) {
            throw new Error('Invalid hexadecimal number. Only digits 0-9 and A-F are allowed.');
          }
          decimalValue = parseInt(inputValue, 16); // Parse as base 16
          break;
        case 'bcd':
          // BCD requires custom parsing. Each 4-bit group represents a decimal digit (0-9).
          if (!/^[01]+$/.test(inputValue)) {
            throw new Error('Invalid BCD format. Only binary digits (0-1) are allowed.');
          }
          // Ensure length is a multiple of 4, although we'll validate each nibble below
          if (inputValue.length % 4 !== 0) {
             throw new Error('Invalid BCD length. Must be a multiple of 4 bits per digit (e.g., 00010010 for 12).');
          }

          let reconstructedDecimalString = '';
          for (let i = 0; i < inputValue.length; i += 4) {
            const nibble = inputValue.substring(i, i + 4); // Get 4-bit group (nibble)
            if (!/^[01]{4}$/.test(nibble)) { // Validate nibble format (should be handled by outer regex, but good for robustness)
                throw new Error('Invalid BCD format: each group must be 4 binary digits.');
            }
            const digit = parseInt(nibble, 2); // Convert nibble to decimal digit
            if (digit > 9) { // BCD digits must be 0-9
                throw new Error(`Invalid BCD digit: ${nibble} is not a valid BCD digit (0-9).`);
            }
            reconstructedDecimalString += digit.toString(); // Append the decimal digit
          }
          // Convert the reconstructed decimal string to a number
          decimalValue = parseInt(reconstructedDecimalString, 10);
          break;
        default:
          throw new Error('Invalid number base unit selected.');
      }

      // Check for parsing errors (e.g., parseInt returns NaN for invalid input)
      if (decimalValue === null || isNaN(decimalValue)) {
        throw new Error('Could not convert input to decimal. Please check the value and unit.');
      }
      // Handle very large numbers if necessary (optional, depending on requirements)
      if (decimalValue > Number.MAX_SAFE_INTEGER || decimalValue < Number.MIN_SAFE_INTEGER) {
          // You might want to handle this gracefully, or use BigInt if target environments support it
          // For now, standard number limitations apply.
      }


      // Store the Decimal result
      this.numBaseConverted.decimal = decimalValue;

      // Convert the decimal value to Binary
      this.numBaseConverted.binary = decimalValue.toString(2);

      // Convert the decimal value to Hexadecimal (uppercase)
      this.numBaseConverted.hex = decimalValue.toString(16).toUpperCase();

      // Convert the decimal value to BCD (Binary-Coded Decimal) representation
      // This converts each decimal digit of the decimalValue into its 4-bit binary equivalent
      let bcdString = '';
      const decimalStr = decimalValue.toString(); // Get decimal value as a string
      for (let i = 0; i < decimalStr.length; i++) {
        const digit = parseInt(decimalStr[i], 10); // Get each decimal digit
        // Convert digit to 4-bit binary, padding with leading zeros if necessary
        bcdString += digit.toString(2).padStart(4, '0');
        // Add a space after each 4-bit group for readability, except for the last one
        if (i < decimalStr.length - 1) {
          bcdString += ' ';
        }
      }
      this.numBaseConverted.bcd = bcdString.trim(); // Trim any trailing space

    } catch (e: any) {
      // Catch any errors during parsing/conversion and display them to the user
      this.numBaseError = e.message;
      this.resetNumBaseResults(); // Reset results when an error occurs
    }
  }

  // Resets all stored number base conversion results to null
  resetNumBaseResults() {
    this.numBaseConverted.decimal = null;
    this.numBaseConverted.binary = null;
    this.numBaseConverted.hex = null;
    this.numBaseConverted.bcd = null;
  }
}