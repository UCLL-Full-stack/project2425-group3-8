import eventDb from "../../repository/event.db";
import visitorDb from "../../repository/visitor.db";
import visitorService from "../../service/visitor.service";
import { VisitorInput } from "../../types";


jest.mock("../repository/visitor.db");
jest.mock("../repository/event.db");

const visitorInput: VisitorInput = {
    address: {
        city: 'Test City',
        cityCode: 'TC',
        street: 'Test Street',
        number: 1,
    },
    event: [],
};

describe('Visitor Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('given: visitor email, when: get visitor by email is called, then: return visitor', async () => {
        (visitorDb.getVisitorByEmail as jest.Mock).mockResolvedValue(visitorInput);

        const result = await visitorService.getMyRegisteredEvents('test@example.com');

        expect(result).toEqual([]); // Verwacht lege lijst omdat er geen geregistreerde evenementen zijn
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledTimes(1);
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledWith('test@example.com');
    });

    test('given: wrong visitor email, when: get visitor by email is called, then: throw error', async () => {
        (visitorDb.getVisitorByEmail as jest.Mock).mockResolvedValue(null);

        await expect(visitorService.getMyRegisteredEvents('wrong@example.com')).rejects.toThrow('Visitor not found with email');
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledTimes(1);
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledWith('wrong@example.com');
    });

    test('given: visitor email and non-existing event, when: add for event is called, then: throw error', async () => {
        (visitorDb.getVisitorByEmail as jest.Mock).mockResolvedValue(visitorInput);
        (eventDb.getEventById as jest.Mock).mockResolvedValue(null);

        await expect(visitorService.addEventToVisitor('test@example.com', 1)).rejects.toThrow('Event not found with id');
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledTimes(1);
        expect(eventDb.getEventById).toHaveBeenCalledTimes(1);
    });

    test('given: visitor email and non-existing event, when: remove from event is called, then: throw error', async () => {
        (visitorDb.getVisitorByEmail as jest.Mock).mockResolvedValue(visitorInput);
        (eventDb.getEventById as jest.Mock).mockResolvedValue(null);

        await expect(visitorService.removeEventFromVisitor('test@example.com', 1)).rejects.toThrow('Event not found with id');
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledTimes(1);
        expect(eventDb.getEventById).toHaveBeenCalledTimes(1);
    });

    test('given: wrong visitor email, when: get registered events is called, then: throw error', async () => {
        (visitorDb.getVisitorByEmail as jest.Mock).mockResolvedValue(null);

        await expect(visitorService.checkVisitorRegistration('wrong@example.com', 1)).rejects.toThrow('Visitor not found with email');
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledTimes(1);
        expect(visitorDb.getVisitorByEmail).toHaveBeenCalledWith('wrong@example.com');
    });
});
