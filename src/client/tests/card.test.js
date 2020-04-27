
import { getCountdown, createCard, formatTemp } from '../js/card'

describe('testing card functions', () => {
    const trip = {
        date: '2019-12-30',
        length: 1,
        weather: {
            high_temp: 50,
            low_temp: 40,
            units: 'I'
        },
        country: 'England',
        city: 'London',
        photo: 'url'
    };
    test('format temp should correctly work', () => {
        expect(formatTemp(trip.weather.high_temp, trip.weather.units))
            .toBe('50 &deg;F');
    })
})