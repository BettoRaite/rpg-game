import {expect} from 'chai';
import {frameSequenceFromPattern} from '../src/lib/helpers/frame.js';

describe('frameSequenceFromPattern', () => {
  it('should throw TypeError for non-number inputs', () => {
    expect(() => frameSequenceFromPattern('not a number')).to.throw(TypeError);
    expect(() => frameSequenceFromPattern(NaN)).to.throw(TypeError);
    expect(() => frameSequenceFromPattern(null)).to.throw(TypeError);
    expect(() => frameSequenceFromPattern(undefined)).to.throw(TypeError);
    expect(() => frameSequenceFromPattern({})).to.throw(TypeError);
  });

  it('should throw TypeError for float-point inputs', () => {
    expect(() => frameSequenceFromPattern(12.3)).to.throw(TypeError);
    expect(() => frameSequenceFromPattern(12.2)).to.throw(TypeError);
    expect(() => frameSequenceFromPattern(1.12)).to.throw(TypeError);
  });
});
