import { assert, expect } from "../../node_modules/chai/chai.js";
import ImageResourceManager from "../../src/core/resources/image-resource-manager.js";
import { ObjectInstanceError } from "../../src/core/utils/errors.js";

describe("ImageResourceManager", () => {
	const resourceMap = {
		girl1: "assets/mirai.png",
		girl2: "assets/kako.png",
	};
	const globalImageResourceManager = new ImageResourceManager(resourceMap);

	describe("constructor", () => {
		it(`should throw ObjectInstanceError 
    if passed value is not an object`, () => {
			const errorMessage = `Parameter: "resourceMap"\nWas expected to be of type: ${EXPECTED_TYPES.object}\n`;
			expect(() => new ImageResourceManager("not an object.")).to.throw(
				ObjectInstanceError,
				errorMessage,
			);
			expect(() => new ImageResourceManager("0")).to.throw(
				ObjectInstanceError,
				errorMessage,
			);
			expect(() => new ImageResourceManager([])).to.throw(
				ObjectInstanceError,
				errorMessage,
			);
			expect(() => new ImageResourceManager(null)).to.throw(
				ObjectInstanceError,
				errorMessage,
			);
		});

		it(`should construct ImageResourceManager 
    instance with valid resourceMap object`, () => {
			const resourceMap = {
				girl1: "assets/mirai.png",
				girl2: "assets/kako.png",
			};
			const imageResourceManager = new ImageResourceManager(resourceMap);
			assert.instanceOf(imageResourceManager, ImageResourceManager);
		});
	});
	describe("getter resources", () => {
		it("should return an object", () => {
			assert.isObject(globalImageResourceManager.resources);
		});
		it("should throw TypeError on assigment", () => {
			expect(() => (globalImageResourceManager.resources = {})).to.throw(
				TypeError,
			);
		});
	});
	describe("getter resourceKeys", () => {
		it(`should return an array`, () => {
			assert.isArray(globalImageResourceManager.resourceKeys);
		});
		it(`should throw TypeError on assigment`, () => {
			expect(() => (globalImageResourceManager.resourceKeys = [])).to.throw(
				TypeError,
			);
		});
	});
});
