import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FinalPuzzleScreen } from "./final-puzzle-screen";

describe("FinalPuzzleScreen", () => {
  it("menampilkan enam keping puzzle", () => {
    render(<FinalPuzzleScreen onReveal={() => undefined} />);

    for (let piece = 1; piece <= 6; piece += 1) {
      expect(
        screen.getByRole("button", {
          name: new RegExp(`pilih keping ${piece}`, "i"),
        }),
      ).toBeInTheDocument();
    }
  });

  it("menggunakan board sesuai kombinasi", async () => {
    const user = userEvent.setup();

    render(<FinalPuzzleScreen onReveal={() => undefined} />);

    const target = screen.getByRole("button", {
      name: /pasang keping ke papan puzzle terakhir/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: /pilih keping 2/i,
      }),
    );
    await user.click(target);

    await user.click(
      screen.getByRole("button", {
        name: /pilih keping 5/i,
      }),
    );
    await user.click(target);

    expect(screen.getByTestId("final-board-p02-p05")).toHaveClass(
      "opacity-100",
    );
  });

  it("menampilkan kejutan setelah lengkap", async () => {
    const user = userEvent.setup();
    const onReveal = vi.fn();

    render(<FinalPuzzleScreen onReveal={onReveal} />);

    const target = screen.getByRole("button", {
      name: /pasang keping ke papan puzzle terakhir/i,
    });

    for (let piece = 1; piece <= 6; piece += 1) {
      await user.click(
        screen.getByRole("button", {
          name: new RegExp(`pilih keping ${piece}`, "i"),
        }),
      );

      await user.click(target);
    }

    expect(screen.getByTestId("final-board-complete")).toHaveClass(
      "opacity-100",
    );

    await user.click(
      screen.getByRole("button", {
        name: /lihat kejutannya/i,
      }),
    );

    expect(onReveal).toHaveBeenCalledOnce();
  });
});
