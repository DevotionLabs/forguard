import fs from "fs";
import yaml, { dump } from "js-yaml";
import { ComposeEditor } from "@compose/index";
import { Logger } from "@logger/index";

// Mock the fs and yaml modules
jest.mock("fs");
jest.mock("@logger/index");

describe("ComposeEditor", () => {
  const mockPath = "./test-docker-compose.yml";
  const mockComposeData = { services: { app: { image: "my-app" } } };
  const spiedRead = jest.spyOn(fs, "readFileSync");
  const spiedWrite = jest.spyOn(fs, "writeFileSync");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should load the compose file correctly", () => {
    spiedRead.mockReturnValue(yaml.dump(mockComposeData));

    const editor = new ComposeEditor(mockPath);

    expect(editor["compose"]).toEqual(mockComposeData);
  });

  it("should log an error when loading the compose file fails", () => {
    spiedRead.mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => new ComposeEditor(mockPath)).toThrow("File not found");
    expect(Logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error loading the compose file:")
    );
  });

  it("should save the compose file correctly", () => {
    spiedWrite.mockImplementation(() => {});

    const editor = new ComposeEditor(mockPath);
    editor["compose"] = mockComposeData;
    editor["saveToFile"].call(editor);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockPath,
      expect.any(String),
      "utf8"
    );

    expect(Logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Successfully written compose to")
    );
  });

  it("should log an error when saving the compose file fails", () => {
    spiedWrite.mockImplementation(() => {
      throw new Error("Write error");
    });

    const editor = new ComposeEditor(mockPath);

    expect(() => editor["saveToFile"].call(editor)).toThrow("Write error");
    expect(Logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error saving the compose file:")
    );
  });
});
