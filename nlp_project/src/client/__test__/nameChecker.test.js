import { checkForName } from "../js/nameChecker";

describe("Testing the nameChecker functionality", () => {
    test("It should be defined", () => {
        expect(checkForName).toBeDefined();
    });

    test("It should alert 'Welcome, Captain!' for valid names", () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        checkForName("Picard");
        expect(mockAlert).toHaveBeenCalledWith("Welcome, Captain!");
        mockAlert.mockRestore();
    });

    test("It should alert 'Enter a valid captain name' for invalid names", () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        checkForName("Unknown");
        expect(mockAlert).toHaveBeenCalledWith("Enter a valid captain name");
        mockAlert.mockRestore();
    });
});
