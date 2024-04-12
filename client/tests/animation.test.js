import {expect} from 'chai';
import {Animation} from '../src/lib/animation/Animation.js';
import {ArrayInstanceError} from '../src/lib/utils/customErrors.js';

describe('Animation', () => {
  describe('constructor', () => {
    it(`should throw ArrayInstanceError 
    if frameNumbers is not an array`, () => {
      const errorMessage = (paramName) => `\n` +
        `Parameter: "${paramName}"\n` +
        `Was expected to be of type: [Array]\n`;

      expect(() => new Animation('not an array'))
          .to.throw(ArrayInstanceError, errorMessage('frameNumbers'));

      expect(() => new Animation(undefined))
          .to.throw(ArrayInstanceError, errorMessage('frameNumbers'));

      expect(() => new Animation({}))
          .to.throw(ArrayInstanceError, errorMessage('frameNumbers'));
    });
  });
});
