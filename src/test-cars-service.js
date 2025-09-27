// Simple test to verify carsService export
import carsService, { carsService as namedCarsService } from './services/carsService.js';

console.log('Default export:', carsService);
console.log('Named export:', namedCarsService);
console.log('Are they the same?', carsService === namedCarsService);

