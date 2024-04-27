import { expect } from "chai";
import { EXPECTED_TYPES } from "../src/core/constants.js";
import {
	NumberTypeError,
	Vector2InstanceError,
} from "../src/core/utils/errors.js";
import Vector2 from "../src/core/vector2.js";

describe("Vector2", () => {
	describe("constructor", () => {
		it("should throw NumberTypeError if any of the two arguments not number.", () => {
			expect(() => new Vector2("not an object.")).to.throw(NumberTypeError);
			expect(() => new Vector2("0")).to.throw(NumberTypeError);
			expect(() => new Vector2(null)).to.throw(NumberTypeError);
			expect(() => new Vector2(0, "asd")).to.throw(NumberTypeError);
			expect(() => new Vector2(0, "1000")).to.throw(NumberTypeError);
			expect(() => new Vector2(0, null)).to.throw(NumberTypeError);

			const errorMessageX = `\nParameter: "x"\nWas expected to be of type: ${EXPECTED_TYPES.number}`;
			const errorMessageY = `\nParameter: "y"\nWas expected to be of type: ${EXPECTED_TYPES.number}`;

			// Check error message content
			expect(() => new Vector2("not an object.")).to.throw(errorMessageX);
			expect(() => new Vector2(0, "asd")).to.throw(errorMessageY);
		});

		it("should construct Vector2 instance with valid [x, y] inputs", () => {
			const point = new Vector2(-1, 0);
			expect(point).to.be.an.instanceOf(Vector2);
		});
	});

	describe("cloneTo", () => {
		it("should clone [x, y] values of point1 to point2 if point2 is Vector2 instance", () => {
			const point1 = new Vector2(0, 0);
			const point2 = new Vector2(10, 10);
			point1.cloneTo(point2);
			expect(`${point2.x}${point2.y}`).to.equal(`${point1.x}${point1.y}`);
		});

		it("should throw Vector2InstanceError if passed in value is not a Vector2 instance", () => {
			const errorMessage = `\nParameter: "point"\nWas expected to be of type: ${EXPECTED_TYPES.vector2}`;
			const point1 = new Vector2(0, 0);

			expect(() => point1.cloneTo([])).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
			expect(() => point1.cloneTo(null)).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
		});
	});
	describe("substractFrom", () => {
		it("should clone [x, y] values of point1 to point2 if point2 is Vector2 instance", () => {
			let point1 = new Vector2(0, 0);
			let point2 = new Vector2(10, 10);
			let deltaX = 10 - 0;
			let deltaY = 10 - 0;
			let deltaPoint = point1.substractFrom(point2);
			expect(`${deltaPoint.x}${deltaPoint.y}`).to.equal(`${deltaX}${deltaY}`);

			point1 = new Vector2(40, 40);
			point2 = new Vector2(10, 10);
			deltaX = 10 - 40;
			deltaY = 10 - 40;
			deltaPoint = point1.substractFrom(point2);
			expect(`${deltaPoint.x}${deltaPoint.y}`).to.equal(`${deltaX}${deltaY}`);
		});

		it("should throw Vector2InstanceError if passed in value is not a Vector2 instance", () => {
			const errorMessage = `\nParameter: "point"\nWas expected to be of type: ${EXPECTED_TYPES.vector2}`;
			const point1 = new Vector2(23, 23);

			expect(() => point1.substractFrom([])).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
			expect(() => point1.substractFrom(null)).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
		});
	});
	describe("isEqualTo", () => {
		it("should return true if deltaX and deltaY fall within a certain range inclusive, which defaults to 0", () => {
			let point1 = new Vector2(0, 0);
			let point2 = new Vector2(0, 0);

			expect(point1.isEqualTo(point2)).to.be.true;

			let offset = 10;
			point1 = new Vector2(20, 20);
			point2 = new Vector2(10, 10);
			expect(point1.isEqualTo(point2, offset)).to.be.true;

			offset = 5;
			point1 = new Vector2(9, 9);
			point2 = new Vector2(10, 10);
			expect(point1.isEqualTo(point2, offset)).to.be.true;
		});
		it("should return false if deltaX or deltaY is more than a certain range, which defaults to 0", () => {
			let point1 = new Vector2(0, 0);
			let point2 = new Vector2(1, 1);

			expect(point1.isEqualTo(point2)).to.be.false;

			let offset = 10;
			point1 = new Vector2(25, 25);
			point2 = new Vector2(10, 10);
			expect(point1.isEqualTo(point2, offset)).to.be.false;

			offset = 0;
			point1 = new Vector2(9, 9);
			point2 = new Vector2(10, 10);
			expect(point1.isEqualTo(point2, offset)).to.be.false;
		});

		it("should throw Vector2InstanceError if passed in value is not a Vector2 instance", () => {
			const errorMessage = `\nParameter: "point"\nWas expected to be of type: ${EXPECTED_TYPES.vector2}`;
			const point1 = new Vector2(23, 23);

			expect(() => point1.isEqualTo([])).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
			expect(() => point1.isEqualTo(null)).to.throw(
				Vector2InstanceError,
				errorMessage,
			);
		});

		it("should throw TypeError if passed in offset is not a positive, finite number", () => {
			const errorMessage = `offset was expected to be a positive, finite number, instead received`;
			const point1 = new Vector2(23, 23);
			const point2 = new Vector2(23,23)
			expect(() => point1.isEqualTo(point2, -1)).to.throw(
				TypeError,
				errorMessage,
			);
			expect(() => point1.isEqualTo(point2, null)).to.throw(
				TypeError,
				errorMessage,
			);
			expect(() => point1.isEqualTo(point2, -23)).to.throw(
				TypeError,
				errorMessage,
			);
		});
	});
});
