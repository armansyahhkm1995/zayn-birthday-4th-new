import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { playSound } from "@/lib/audio";

import { TeddyPuzzleScreen } from "./teddy-puzzle-screen";

vi.mock("@/lib/audio", () => ({
  playSound: vi.fn(),
}));

describe("TeddyPuzzleScreen", () => {
  it("menampilkan tiga pilihan teddy", () => {
    render(<TeddyPuzzleScreen onSolved={() => undefined} />);

    expect(
      screen.getByRole("button", {
        name: /pilih teddy duduk/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih teddy melambaikan tangan/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih teddy bersorak/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pasang teddy ke papan puzzle/i,
      }),
    ).toBeDisabled();
  });

  it("memberikan feedback dan audio untuk teddy yang salah", async () => {
    const user = userEvent.setup();

    render(<TeddyPuzzleScreen onSolved={() => undefined} />);

    const wavingTeddy = screen.getByRole("button", {
      name: /pilih teddy melambaikan tangan/i,
    });

    const target = screen.getByRole("button", {
      name: /pasang teddy ke papan puzzle/i,
    });

    await user.click(wavingTeddy);

    expect(wavingTeddy).toHaveAttribute("aria-pressed", "true");

    expect(target).toBeEnabled();

    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(/belum cocok/i);

    expect(vi.mocked(playSound)).toHaveBeenCalledWith("wrong");
  });

  it("memberikan feedback salah untuk teddy bersorak", async () => {
    const user = userEvent.setup();

    render(<TeddyPuzzleScreen onSolved={() => undefined} />);

    await user.click(
      screen.getByRole("button", {
        name: /pilih teddy bersorak/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /pasang teddy ke papan puzzle/i,
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(/belum cocok/i);

    expect(vi.mocked(playSound)).toHaveBeenCalledWith("wrong");
  });

  it("menampilkan completed board dan audio benar untuk teddy duduk", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();

    render(<TeddyPuzzleScreen onSolved={onSolved} />);

    const sittingTeddy = screen.getByRole("button", {
      name: /pilih teddy duduk/i,
    });

    const target = screen.getByRole("button", {
      name: /pasang teddy ke papan puzzle/i,
    });

    await user.click(sittingTeddy);

    expect(sittingTeddy).toHaveAttribute("aria-pressed", "true");

    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(/potongannya cocok/i);

    expect(screen.getByTestId("teddy-board-completed")).toHaveClass(
      "opacity-100",
    );

    expect(
      screen.getByRole("button", {
        name: /papan puzzle teddy lengkap/i,
      }),
    ).toBeDisabled();

    expect(vi.mocked(playSound)).toHaveBeenCalledWith("correct");

    await waitFor(
      () => {
        expect(onSolved).toHaveBeenCalledOnce();
      },
      {
        timeout: 1500,
      },
    );
  });
});
