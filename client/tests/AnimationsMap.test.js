import {expect} from 'chai';
import AnimationsMap from '../src/lib/animation/AnimationsMap.js';
import {
  ObjectInstanceError,
  AnimationInstanceError,
} from '../src/lib/utils/Errors.js';
import {EXPECTED_TYPES} from '../src/lib/constants.js';
import {Animation} from '../src/lib/animation/Animation.js';

describe('AnimationsMap', () => {
  describe('constructor', () => {
    it(`should throw ObjectInstanceError 
    if passed value is not an object`, () => {
      const errorMessage = `Parameter: "animationsMapping"\n` +
          `Was expected to be of type: ${EXPECTED_TYPES.object}\n`;

      expect(() => new AnimationsMap('not an object.'))
          .to.throw(ObjectInstanceError, errorMessage);
      expect(() => new AnimationsMap([]))
          .to.throw(ObjectInstanceError, errorMessage);
      expect(() => new AnimationsMap(undefined))
          .to.throw(ObjectInstanceError, errorMessage);
      expect(() => new AnimationsMap(new Map()))
          .to.throw(ObjectInstanceError, errorMessage);
    });

    it(`should construct AnimationsMap 
    instance with valid object input`, () => {
      const animationsMapping = {
        walk: new Animation([1], 1),
        run: new Animation([1], 1),
        jump: new Animation([1], 1),
      };

      const animationsMap = new AnimationsMap(animationsMapping);
      expect(animationsMap).to.be.an.instanceOf(AnimationsMap);
    });

    it(`should throw AnimationInstanceError 
    if any value is not an instance of Animation`, () => {
      const animationsMapping = {
        walk: new Animation([1], 1),
        run: 'not an animation',
        jump: new Animation([1], 1),
      };

      const errorMessage =
      // eslint-disable-next-line max-len
      `Parameter "animation with key: run" was expected to be an instance of class Animation`;

      expect(() => new AnimationsMap(animationsMapping))
          .to.throw(AnimationInstanceError, errorMessage);
    });
  });
});
