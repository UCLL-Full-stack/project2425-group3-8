import { Visitor } from '../../model/Visitor';
import { User } from '../../model/User';
import { Location } from '../../model/Location';
import { Role } from '../../types'; // Zorg ervoor dat je roltype correct importeert

test('given: valid values for visitor, when: visitor is created, then: visitor is created with those values', () => {
    const role: Role = 'admin'; 
    const user = new User({
        fullName: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        password: 'password123',
        role: role,
    });

    const location = new Location({
        city: 'Metropolis',
        cityCode: '1254t',
        street: 'blabla',
        number: 12345,
    });

    const visitor = new Visitor({
        user: user,
        visitorId: 1,
        address: location,
    });

    expect(visitor.getFullName()).toBe('John Doe');
    expect(visitor.getPhoneNumber()).toBe('1234567890');
    expect(visitor.getEmail()).toBe('john.doe@example.com');
    expect(visitor.getAddress()).toBe(location);
    expect(visitor.getVisitorId()).toBe(1);
});