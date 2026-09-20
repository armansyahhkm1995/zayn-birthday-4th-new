import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BeachPuzzleScreen } from "./beach-puzzle-screen";

describe("BeachPuzzleScreen", () => {
  it("menampilkan papan dan tiga pilihan puzzle", () => {
    render(<BeachPuzzleScreen />);

    expect(
      screen.getByRole("heading", {
        name: /bisa cari mana anak pausnya zayn/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /papan puzzle keluarga paus/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("list", {
        name: /pilihan potongan puzzle/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Gurita" })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Anak paus" })).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Rumput laut" }),
    ).toBeInTheDocument();
  });
});
