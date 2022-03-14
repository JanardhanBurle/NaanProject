import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(message: string, stack: any) {
    // Send errors to server here
    console.log('LoggingService: ' + message);
  }

  logInfo(message: string, stack: any) {
    // Send errors to server here
    console.log('LoggingService: ' + message);
  }
  
}
