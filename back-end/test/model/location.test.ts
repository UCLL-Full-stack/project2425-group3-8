import { set } from 'date-fns';
import { Location } from '../../model/Location';


const start = set(new Date(), { hours: 8, minutes: 30 });

test('given: valid values for Location, when: Location is created, then: Location is created with those values', () => {
    const location = new Location({
        city: 'New York',
        cityCode: 'NYC',
        street: '5th Avenue',
        number: 101,
    });

    expect(location.getCity()).toBe('New York');
    expect(location.getCityCode()).toBe('NYC');
    expect(location.getStreet()).toBe('5th Avenue');
    expect(location.getNumber()).toBe(101);
});

test('given: invalid location data without city, when: Location is validated, then: error is thrown', () => {
    const invalidLocation = {
        city: '', 
        cityCode: 'NYC',
        street: '5th Avenue',
        number: 101,
    };

    expect(() => {
        new Location(invalidLocation).validate(invalidLocation);
    }).toThrow('City is required');
});

test('given: invalid location data without cityCode, when: Location is validated, then: error is thrown', () => {
    const invalidLocation = {
        city: 'New York',
        cityCode: '', 
        street: '5th Avenue',
        number: 101,
    };

    expect(() => {
        new Location(invalidLocation).validate(invalidLocation);
    }).toThrow('City code is required');
});

test('given: invalid location data without street, when: Location is validated, then: error is thrown', () => {
    const invalidLocation = {
        city: 'New York',
        cityCode: 'NYC',
        street: '', 
        number: 101,
    };

    expect(() => {
        new Location(invalidLocation).validate(invalidLocation);
    }).toThrow('Street is required');
});

test('given: invalid location data with number 0, when: Location is validated, then: error is thrown', () => {
    const invalidLocation = {
        city: 'New York',
        cityCode: 'NYC',
        street: '5th Avenue',
        number: 0, 
    };

    expect(() => {
        new Location(invalidLocation).validate(invalidLocation);
    }).toThrow('Number is required');
});

test('given: valid location data, when: Location is validated, then: no error is thrown', () => {
    const validLocation = {
        city: 'New York',
        cityCode: 'NYC',
        street: '5th Avenue',
        number: 101,
    };

    expect(() => {
        new Location(validLocation).validate(validLocation);
    }).not.toThrow();
});
