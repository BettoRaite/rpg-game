/* eslint-disable require-jsdoc */
// [-]: Add JSdoc
export function moveTowards(entity, destPos, speed ) {
  let deltaX = destPos.x - entity.x;
  let deltaY = destPos.y - entity.y;
  let distance = Math.sqrt(deltaX**2 + deltaY**2);
  if (distance <= 0) {
    return distance;
  } else {
    const normalizedX = deltaX / distance;
    const normalizedY = deltaY / distance;

    entity.x += normalizedX * speed;
    entity.y += normalizedY * speed;

    deltaX = destPos.x - entity.x;
    deltaY = destPos.y - entity.y;
    distance = Math.sqrt(deltaX**2 + deltaY**2);
  }
  return distance;
}
