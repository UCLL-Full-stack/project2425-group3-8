import { User } from "../../model/User";
import { UserInput } from "../../types";
import authenticateService from "../../service/user.service";
import userDb from "../../repository/user.db";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../util/jwt";

jest.mock("../../repository/user.db");
jest.mock("bcrypt");
jest.mock("../../util/jwt");

const userInput: UserInput = {
    fullName: "Test User",
    phoneNumber: "123456789",
    email: "testUser@gmail.com",
    password: "password",
    role: "admin",
};

const user = new User({
    ...userInput,
    password: "$2b$10$hashedpassword",
});

let mockGetUserByEmail: jest.Mock;
let mockAuthenticate: jest.Mock;

beforeEach(() => {
    mockGetUserByEmail = jest.spyOn(userDb, "getUserByEmail") as jest.Mock;
    mockAuthenticate = jest.spyOn(authenticateService, "authenticate") as jest.Mock;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Authenticate Service", () => {
    beforeEach(() => {
        mockGetUserByEmail = jest.spyOn(userDb, "getUserByEmail") as jest.Mock;
        mockAuthenticate = jest.spyOn(authenticateService, "authenticate") as jest.Mock;
        jest.spyOn(bcrypt, "compare").mockImplementation((inputPassword, hashedPassword) => {
            return inputPassword === "password" && hashedPassword === "$2b$10$hashedpassword";
        });
    });

    describe("getUserByEmail", () => {
        test("given: valid email, when: getUserByEmail is called, then: return user", async () => {
            mockGetUserByEmail.mockResolvedValue(user);

            const result = await authenticateService.getUserByEmail(userInput);
            expect(result).toEqual(user);
            expect(mockGetUserByEmail).toHaveBeenCalledWith("testUser@gmail.com");
        });

        test("given: invalid email, when: getUserByEmail is called, then: throw error", async () => {
            mockGetUserByEmail.mockResolvedValue(null);

            await expect(authenticateService.getUserByEmail(userInput))
                .rejects.toThrow("Email or password is incorrect.");
            expect(mockGetUserByEmail).toHaveBeenCalledWith("testUser@gmail.com");
        });
    });

    describe("getRole", () => {
        test("given: valid email, when: getRole is called, then: return role", async () => {
            mockGetUserByEmail.mockResolvedValue(user);

            const result = await authenticateService.getRole(userInput);
            expect(result).toBe("admin");
            expect(mockGetUserByEmail).toHaveBeenCalledWith("testUser@gmail.com");
        });

        test("given: invalid email, when: getRole is called, then: throw error", async () => {
            mockGetUserByEmail.mockResolvedValue(null);

            await expect(authenticateService.getRole(userInput))
                .rejects.toThrow();
            expect(mockGetUserByEmail).toHaveBeenCalledWith("testUser@gmail.com");
        });
    });
});


