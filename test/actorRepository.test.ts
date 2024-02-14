import "mocha";
import fs from "fs";
import {saveData, fetchData} from "../src/actorRepository.js";
import {expect} from "chai";

// Path where to store the data
const path: string = "test/storage/mockData.json";

// Mock data for testing
const mockData = [
    [
        "Tom Hanks",
        [{"title": "Cast Away", "year": 2000, "cast": "Helen Hunt"}]],
    [
        "Emma Watson",
        [{"title": "Beauty and the Beast", "year": 2017, "cast": "Dan Stevens"}]
    ]
];

describe("saveData", () => {
    it("should save data to file successfully", () => {

        // Call the saveData function
        const result = saveData(mockData, path);

        // Check that the function returns true (success)
        expect(result).to.equal(true);

        // Check that the file was created and contains the correct data
        const jsonString = fs.readFileSync(path, "utf8");
        const savedData = JSON.parse(jsonString);
        expect(savedData).to.deep.equal(mockData);

        // Clean up the test file
        fs.unlinkSync(path);
    });

    it("should return false when there is an error", () => {

        // Test data to save (invalid, to trigger an error)
        const data = 42; // non-object data

        // Call the saveData function
        const result = saveData(data, path);

        // Check that the function returns false (error)
        expect(result).to.equal(false);

        // Check that the file was not created
        const fileExists = fs.existsSync(path);
        expect(fileExists).to.equal(false);
    });
});

describe("fetchData", () => {
    it("should return a map of actors and their movies", async () => {

        // Call the saveData function
        const savedData = saveData(mockData, path);

        // Check that the function returns true (success)
        expect(savedData).to.equal(true);

        const result = await fetchData(path);

        // Assert that the result is a Map
        expect(result).to.be.an.instanceOf(Map);

        // Assert that the map has the expected keys and values
        expect(result.get("Tom Hanks")).to.deep.equal([
            {title: "Cast Away", year: 2000, cast: "Helen Hunt"}
        ]);
        expect(result.get("Emma Watson")).to.deep.equal([
            {title: "Beauty and the Beast", year: 2017, cast: "Dan Stevens"}
        ]);

        // Clean up the test file
        fs.unlinkSync(path);
    });
});