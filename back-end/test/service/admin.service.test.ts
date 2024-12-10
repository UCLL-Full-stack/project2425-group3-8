import { User } from "../../model/User";
import adminService from "../../service/admin.service";
import { UserInput } from "../../types";


const userInput: UserInput = {
    fullName: 'Test User',
    phoneNumber: '123456789',
    email: 'testUser@gmail.com',
    password: 'password',
    role: 'admin'
}

const user = new User({
    ...userInput
});

let mockGetAdminByEmail: jest.Mock;

beforeEach(() => {
    mockGetAdminByEmail = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test ('given: user input, when: get admin by email is called, then: return admin', async () => {
    mockGetAdminByEmail.mockResolvedValue(user);

    expect(await mockGetAdminByEmail(userInput)).toEqual(user);

    expect(mockGetAdminByEmail).toHaveBeenCalledTimes(1);
    expect(mockGetAdminByEmail).toHaveBeenCalledWith(userInput);
});