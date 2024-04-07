/* eslint-disable require-jsdoc */
/**
 * Represents collision checker.
 */
export class CollisionDetector {
  constructor() {
    this._colliders = [];
  }
  addCollider(pointStart, pointEnd) {
    this._colliders.push({
      start: pointStart,
      end: pointEnd,
    });
  }
  isColliding(entityPos) {
    for (const collider of this._colliders) {
      console.log('Colider-x', collider.start.x, collider.end.x);
      console.log('Colider-y', collider.start.y, collider.end.y);
      if (collider.start.x <= entityPos.x &&
        entityPos.x <= collider.end.x &&
        collider.start.y <= entityPos.y &&
        entityPos.y <= collider.end.y) {
        return true;
      }
    }
    return false;
  }
}
