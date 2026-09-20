type Point = {
  x: number;
  y: number;
};

type RectLike = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export function isPointInsideRect(point: Point, rect: RectLike, tolerance = 0) {
  return (
    point.x >= rect.left - tolerance &&
    point.x <= rect.right + tolerance &&
    point.y >= rect.top - tolerance &&
    point.y <= rect.bottom + tolerance
  );
}
