import { Logger } from "../../../src/logger/index";

describe("Logger", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testLoggingMethod = (
    logMethod: (message: string) => void,
    level: string,
    message: string
  ) => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    logMethod(message);

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(`[${level.toUpperCase()}]`)
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(message));

    consoleSpy.mockRestore();
  };

  it("should log an info message with the correct format", () => {
    testLoggingMethod(Logger.info, "info", "This is an info message");
  });

  it("should log a warn message with the correct format", () => {
    testLoggingMethod(Logger.warn, "warn", "This is a warning message");
  });

  it("should log an error message with the correct format", () => {
    testLoggingMethod(Logger.error, "error", "This is an error message");
  });

  it("should log a debug message with the correct format", () => {
    testLoggingMethod(Logger.debug, "debug", "This is a debug message");
  });
});
