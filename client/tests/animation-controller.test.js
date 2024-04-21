import {expect} from 'chai';
import {
  AnimationController,
} from '../src/lib/animation/animation-controller.js';
import {walkDownAnimation} from '../src/lib/animation/animation.js';
import {
  AnimationInstanceError,
} from '../src/lib/utils/errors.js';

describe('AnimationController', () => {
  describe('constructor', () => {
    it(`should throw AnimationInstanceError 
    if animation is not an instance of animation class`, ()=>{
      expect(() => new AnimationController('not an animation'))
          .to.throw(AnimationInstanceError);
      expect(() => new AnimationController([]))
          .to.throw(AnimationInstanceError);
      expect(() => new AnimationController({}))
          .to.throw(AnimationInstanceError);
    });
  });
  describe('step method', () => {
    it(`should throw TypeError 
    if provided deltaTime is not a positive integer`, ()=>{
      const animationController = new AnimationController(walkDownAnimation);
      expect(() => animationController.step(-1))
          .to.throw(TypeError);
      expect(() => animationController.step(Infinity))
          .to.throw(TypeError);
      expect(() => animationController.step(null))
          .to.throw(TypeError);
      expect(() => animationController.step(undefined))
          .to.throw(TypeError);
    });
  });
});
