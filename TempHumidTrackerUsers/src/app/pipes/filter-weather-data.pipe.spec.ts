import { FilterWeatherDataPipe } from './filter-weather-data.pipe';

describe('FilterWeatherDataPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterWeatherDataPipe();
    expect(pipe).toBeTruthy();
  });
});
