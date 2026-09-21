import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BeachPuzzleScreen } from "./beach-puzzle-screen";
import { playSound } from "@/lib/audio";

vi.mock("@/lib/audio", () => ({
  playSound: vi.fn(),
}));

describe("BeachPuzzleScreen", () => {
  it("menampilkan target dan tiga pilihan", () => {
    render(<BeachPuzzleScreen onSolved={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /bisa cari mana anak pausnya zayn/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pasang potongan ke papan puzzle/i,
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: /pilih gurita/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih anak paus/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih rumput laut/i,
      }),
    ).toBeInTheDocument();
  });

  it("memberikan feedback jika pilihan salah", async () => {
    const user = userEvent.setup();

    render(<BeachPuzzleScreen onSolved={() => undefined} />);

    const octopus = screen.getByRole("button", {
      name: /pilih gurita/i,
    });

    const target = screen.getByRole("button", {
      name: /pasang potongan ke papan puzzle/i,
    });

    const mockedPlaySound = vi.mocked(playSound);

    await user.click(octopus);

    expect(octopus).toHaveAttribute("aria-pressed", "true");

    expect(target).toBeEnabled();

    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(/belum tepat/i);

    expect(target).toBeDisabled();

    expect(playSound).toHaveBeenCalledWith("wrong");

    expect(mockedPlaySound).toHaveBeenCalledWith("wrong");
  });

  it("mengunci puzzle jika anak paus dipilih", async () => {
    const user = userEvent.setup();

    render(<BeachPuzzleScreen onSolved={() => undefined} />);

    const whale = screen.getByRole("button", {
      name: /pilih anak paus/i,
    });

    const target = screen.getByRole("button", {
      name: /pasang potongan ke papan puzzle/i,
    });

    const mockedPlaySound = vi.mocked(playSound);

    await user.click(whale);
    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(
      /anak pausnya ketemu/i,
    );

    expect(whale).toBeDisabled();
    expect(target).toBeDisabled();

    const completedBoard = screen.getByTestId("beach-board-completed");

    expect(completedBoard).toHaveClass("opacity-100");

    expect(completedBoard.getAttribute("src")).toContain(
      "beach-board-completed.webp",
    );

    expect(
      screen.getByRole("button", {
        name: /papan puzzle keluarga paus lengkap/i,
      }),
    ).toBeDisabled();

    expect(playSound).toHaveBeenCalledWith("correct");

    expect(mockedPlaySound).toHaveBeenCalledWith("correct");
  });
});
