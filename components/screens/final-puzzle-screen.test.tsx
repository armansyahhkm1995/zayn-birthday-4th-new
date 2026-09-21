import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { playSound } from "@/lib/audio";

import { FinalPuzzleScreen } from "./final-puzzle-screen";

vi.mock("@/lib/audio", () => ({
  playSound: vi.fn(),
}));

describe("FinalPuzzleScreen", () => {
  it("menampilkan board kosong dan enam keping puzzle", () => {
    render(<FinalPuzzleScreen onReveal={() => undefined} />);

    expect(screen.getByTestId("final-board-empty")).toHaveClass("opacity-100");

    for (let piece = 1; piece <= 6; piece += 1) {
      expect(
        screen.getByRole("button", {
          name: new RegExp(`pilih keping ${piece}`, "i"),
        }),
      ).toBeInTheDocument();
    }

    expect(
      screen.getByRole("button", {
        name: /pasang keping ke papan puzzle terakhir/i,
      }),
    ).toBeDisabled();
  });

  it("memilih keping dan mengaktifkan target", async () => {
    const user = userEvent.setup();

    render(<FinalPuzzleScreen onReveal={() => undefined} />);

    const pieceOne = screen.getByRole("button", {
      name: /pilih keping 1/i,
    });

    const target = screen.getByRole("button", {
      name: /pasang keping ke papan puzzle terakhir/i,
    });

    await user.click(pieceOne);

    expect(pieceOne).toHaveAttribute("aria-pressed", "true");

    expect(target).toBeEnabled();
  });

  it("menggunakan board sesuai kombinasi keping", async () => {
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

    expect(screen.getByTestId("final-board-p02")).toHaveClass("opacity-100");

    await user.click(
      screen.getByRole("button", {
        name: /pilih keping 5/i,
      }),
    );

    await user.click(target);

    expect(screen.getByTestId("final-board-p02-p05")).toHaveClass(
      "opacity-100",
    );

    expect(vi.mocked(playSound)).toHaveBeenCalledWith("correct");

    expect(vi.mocked(playSound)).toHaveBeenCalledTimes(2);
  });

  it("menampilkan board lengkap setelah semua keping terpasang", async () => {
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

    expect(screen.getByRole("status")).toHaveTextContent(
      /semua keping sudah terpasang/i,
    );

    expect(
      screen.getByRole("button", {
        name: /puzzle foto lengkap/i,
      }),
    ).toBeDisabled();

    expect(vi.mocked(playSound)).toHaveBeenCalledWith("correct");

    expect(vi.mocked(playSound)).toHaveBeenCalledTimes(6);

    const revealButton = screen.getByRole("button", {
      name: /lihat kejutannya/i,
    });

    await user.click(revealButton);

    expect(onReveal).toHaveBeenCalledOnce();
  });
});
