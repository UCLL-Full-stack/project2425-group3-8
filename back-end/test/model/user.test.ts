
import { User } from '../../model/User';
import { Role } from '../../types'; 

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const role: Role = 'admin'; 

    const user = new User({
        fullName: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        password: 'password123',
        role: role,
    });

    expect(user.getFullName()).toBe('John Doe');
    expect(user.getPhoneNumber()).toBe('1234567890');
    expect(user.getEmail()).toBe('john.doe@example.com');
    expect(user.getPassword()).toBe('password123');
    expect(user.getRole()).toBe(role);
});

test('given: user with missing full name, when: user is created, then:  error is thrown', () => {
    const role: Role = 'admin';

    const user = () =>
        new User({
            fullName: '',
            phoneNumber: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123',
            role: role,
        });

    expect(user).toThrow('Full name is required');
});

test('given: user with missing phone number, when: user is created, then:  error is thrown', () => {
    const role: Role = 'admin';

    const user = () =>
        new User({
            fullName: 'John Doe',
            phoneNumber: '',
            email: 'john.doe@example.com',
            password: 'password123',
            role: role,
        });

    expect(user).toThrow('Phone number is required');
});

test('given: user with invalid email, when: user is created, then:  error is thrown', () => {
    const role: Role = 'admin';

    const user = () =>
        new User({
            fullName: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john.doeexample.com', 
            password: 'password123',
            role: role,
        });

    expect(user).toThrow('Invalid email');
});

test('given: user with missing password, when: user is created, then:  error is thrown', () => {
    const role: Role = 'admin';

    const user = () =>
        new User({
            fullName: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john.doe@example.com',
            password: '', 
            role: role,
        });

    expect(user).toThrow('Password is required');
});

test('given: user with missing role, when: user is created, then:  error is thrown', () => {
    const user = () =>
        new User({
            fullName: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123',
            role: undefined as any, 
        });

    expect(user).toThrow('Role is required');
});
