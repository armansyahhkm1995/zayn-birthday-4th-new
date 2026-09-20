import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { GameApp } from "./game-app";

describe("GameApp", () => {
  it("berpindah dari splash ke Puzzle 01", async () => {
    const user = userEvent.setup();

    render(<GameApp />);

    const playButton = screen.getByRole("button", {
      name: /ayo main/i,
    });

    await user.click(playButton);

    expect(
      screen.getByRole("heading", {
        name: /bisa cari mana anak pausnya zayn/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /ayo main/i,
      }),
    ).not.toBeInTheDocument();
  });
});
