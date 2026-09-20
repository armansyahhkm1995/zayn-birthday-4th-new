import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SpacePuzzleScreen } from "./space-puzzle-screen";

describe("SpacePuzzleScreen", () => {
  it("menampilkan tiga potongan puzzle", () => {
    render(<SpacePuzzleScreen onSolved={() => undefined} />);

    expect(
      screen.getByRole("button", {
        name: /pilih paus bintang/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih paus planet/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih paus bersayap/i,
      }),
    ).toBeInTheDocument();
  });

  it("selesai setelah ketiga potongan dipasang", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();

    render(<SpacePuzzleScreen onSolved={onSolved} />);

    const target = screen.getByRole("button", {
      name: /pasang potongan ke papan luar angkasa/i,
    });

    const labels = [
      /pilih paus bintang/i,
      /pilih paus planet/i,
      /pilih paus bersayap/i,
    ];

    for (const label of labels) {
      await user.click(screen.getByRole("button", { name: label }));

      await user.click(target);
    }

    expect(screen.getByRole("status")).toHaveTextContent(
      /semua keluarga paus sudah terpasang/i,
    );

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
