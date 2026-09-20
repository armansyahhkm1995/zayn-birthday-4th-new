import { describe, expect, it } from "vitest";

import { isPointInsideRect } from "./is-point-inside-rect";

const target = {
  left: 100,
  right: 200,
  top: 100,
  bottom: 200,
};

describe("isPointInsideRect", () => {
  it("menerima titik di dalam target", () => {
    expect(isPointInsideRect({ x: 150, y: 150 }, target)).toBe(true);
  });

  it("menerima titik yang dekat dengan target", () => {
    expect(isPointInsideRect({ x: 80, y: 150 }, target, 24)).toBe(true);
  });

  it("menolak titik yang terlalu jauh", () => {
    expect(isPointInsideRect({ x: 50, y: 150 }, target, 24)).toBe(false);
  });
});
