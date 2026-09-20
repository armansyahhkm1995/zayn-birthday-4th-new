import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { GameApp } from "./game-app";

describe("GameApp", () => {
  it("membuka Memory Umur 1 setelah puzzle benar", async () => {
    const user = userEvent.setup();

    render(<GameApp />);

    await user.click(
      screen.getByRole("button", {
        name: /ayo main/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /pilih anak paus/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /pasang potongan ke papan puzzle/i,
      }),
    );

    expect(
      await screen.findByRole(
        "heading",
        {
          name: /umur 1 tahun/i,
        },
        {
          timeout: 1500,
        },
      ),
    ).toBeInTheDocument();
  });
});
