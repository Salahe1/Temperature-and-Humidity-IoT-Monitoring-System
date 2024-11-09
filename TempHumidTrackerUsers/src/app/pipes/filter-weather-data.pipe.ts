import { Pipe, PipeTransform } from '@angular/core';
import { WeatherData } from '../dashboard/dashboard.component'; // Adjust the import path accordingly

@Pipe({
  name: 'filterWeatherData'
})
export class FilterWeatherDataPipe implements PipeTransform {
  transform(data: WeatherData[], hours: string): WeatherData[] {
    if (!data || !hours) return data;

    const now = new Date();
    const timeDiff = hours === 'all' ? Infinity : parseInt(hours) * 60 * 60 * 1000; // Convert hours to milliseconds

    return data.filter(item => {
      const itemDate = new Date(item.timestamp);
      return (now.getTime() - itemDate.getTime()) <= timeDiff; // Filter based on time difference
    });
  }
}
