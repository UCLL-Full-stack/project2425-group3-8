
import { Admin as AdminPrisma, Location as LocationPrisma, User as UserPrisma } from '@prisma/client';
import { User } from '../../model/User';
import { Location } from '../../model/Location';
import { Admin } from '../../model/Admin';

const sampleUser = new User({ id: 1, fullName: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', password: 'password123', role: 'admin' });
const sampleLocation = new Location({ city: 'New York', cityCode: 'NYC', street: '5th Avenue', number: 101 });

const sampleAdminData = {
    user: sampleUser,
    adminId: 1,
    address: sampleLocation
};

test('Given: valid values, when creating admin, then; admin made with no errors', () => {
    const admin = new Admin(sampleAdminData);

    expect(admin.getId()).toBe(sampleUser.getId());
    expect(admin.getFullName()).toBe(sampleUser.getFullName());
    expect(admin.getPhoneNumber()).toBe(sampleUser.getPhoneNumber());
    expect(admin.getEmail()).toBe(sampleUser.getEmail());
    expect(admin.getRole()).toBe(sampleUser.getRole());
    expect(admin.getAdminId()).toBe(sampleAdminData.adminId);
    expect(admin.getAddress()).toEqual(sampleLocation);
});

test('Given: admin without an address, when: adding admin, then: error should throw', () => {
    const invalidAdminData = {
        user: new User({ id: 2, fullName: 'Jane Doe', phoneNumber: '0987654321', email: 'jane@example.com', password: 'password321', role: 'admin' }),
        adminId: 2,
        address: undefined
    };

    expect(() => {
        new Admin(invalidAdminData).validateAdmin(invalidAdminData);
    }).toThrow('Address is required');
});

test('Given: admin with valid data, when: adding an admin, then: no errors thrown', () => {
    const validAdminData = {
        user: new User({ id: 3, fullName: 'Alice Doe', phoneNumber: '1112223333', email: 'alice@example.com', password: 'password987', role: 'admin' }),
        adminId: 3,
        address: sampleLocation
    };

    expect(() => {
        new Admin(validAdminData).validateAdmin(validAdminData);
    }).not.toThrow();
});

