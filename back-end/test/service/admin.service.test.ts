import { User } from "../../model/User";
import adminService from "../../service/admin.service";
import { UserInput } from "../../types";

// Mock de service-module
jest.mock("../../service/admin.service");

describe('Admin Service Tests', () => {
    // Define user input and user instance
    const userInput: UserInput = {
        fullName: 'Test User',
        phoneNumber: '123456789',
        email: 'testUser@gmail.com',
        password: 'password',
        role: 'admin',
    };

    const user = new User({
        ...userInput,
    });

    const mockGetAdminByEmail = adminService.getAdminByEmail as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('given: admin email, when: get admin by email is called, then: return the admin user', async () => {
        mockGetAdminByEmail.mockResolvedValue(user);

        const result = await adminService.getAdminByEmail(userInput);

        expect(result).toEqual(user);
        expect(mockGetAdminByEmail).toHaveBeenCalledTimes(1);
        expect(mockGetAdminByEmail).toHaveBeenCalledWith(userInput);
    });
});
