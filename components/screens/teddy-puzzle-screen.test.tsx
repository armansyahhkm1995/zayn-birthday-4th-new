import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TeddyPuzzleScreen } from "./teddy-puzzle-screen";

describe("TeddyPuzzleScreen", () => {
  it("memberikan feedback untuk teddy yang salah", async () => {
    const user = userEvent.setup();

    render(<TeddyPuzzleScreen onSolved={() => undefined} />);

    await user.click(
      screen.getByRole("button", {
        name: /pilih teddy melambaikan tangan/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /pasang teddy ke papan puzzle/i,
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(/belum cocok/i);
  });

  it("menampilkan completed board untuk teddy duduk", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();

    render(<TeddyPuzzleScreen onSolved={onSolved} />);

    await user.click(
      screen.getByRole("button", {
        name: /pilih teddy duduk/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /pasang teddy ke papan puzzle/i,
      }),
    );

    expect(screen.getByTestId("teddy-board-completed")).toHaveClass(
      "opacity-100",
    );

    expect(
      screen.getByRole("button", {
        name: /papan puzzle teddy lengkap/i,
      }),
    ).toBeDisabled();

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
