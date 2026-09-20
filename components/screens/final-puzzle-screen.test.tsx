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

  it("menampilkan kejutan setelah semua keping terpasang", async () => {
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

    expect(screen.getByRole("status")).toHaveTextContent(
      /semua keping sudah terpasang/i,
    );

    const revealButton = screen.getByRole("button", {
      name: /lihat kejutannya/i,
    });

    await user.click(revealButton);

    expect(onReveal).toHaveBeenCalledOnce();
  });
});
