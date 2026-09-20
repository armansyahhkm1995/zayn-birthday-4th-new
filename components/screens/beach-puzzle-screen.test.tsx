import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BeachPuzzleScreen } from "./beach-puzzle-screen";

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

    await user.click(octopus);

    expect(octopus).toHaveAttribute("aria-pressed", "true");

    expect(target).toBeEnabled();

    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(/belum tepat/i);

    expect(target).toBeDisabled();
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

    await user.click(whale);
    await user.click(target);

    expect(screen.getByRole("status")).toHaveTextContent(
      /anak pausnya ketemu/i,
    );

    expect(whale).toBeDisabled();
    expect(target).toBeDisabled();
  });
});
