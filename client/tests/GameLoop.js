import {expect} from 'chai';
import {GameLoop} from '../src/lib/GameLoop.js';
import {InvalidFunctionTypeError} from '../src/lib/utils/customErrors.js';

describe('GameLoop', () => {
  describe('class that creates a basic game loop', ()=>{
    describe(`should throw InvalidFunctionTypeError 
    for non-function params fed to constructor`, () => {
      it(`should throw error for updater parameter 
      with custom description, if first arg non-function`, ()=>{
        const paramName = 'updater';
        const expectedDescription =
        `Parameter "${paramName}" was expected to be a function.`;
        expect(() => new GameLoop(5, 5)).to.throw(
            InvalidFunctionTypeError,
            expectedDescription);
      });
      it(`should throw error for renderer parameter 
      with custom description, if second arg non-function`, ()=>{
        const paramName = 'renderer';
        const expectedDescription =
        `Parameter "${paramName}" was expected to be a function.`;
        expect(() => new GameLoop(()=>{}, 5)).to.throw(
            InvalidFunctionTypeError,
            expectedDescription);
      });
    });
  });
});
