import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SpacePuzzleScreen } from "./space-puzzle-screen";

describe("SpacePuzzleScreen", () => {
  it("menampilkan tiga anggota keluarga paus", () => {
    render(<SpacePuzzleScreen onSolved={() => undefined} />);

    expect(
      screen.getByRole("button", {
        name: /pilih paus aba/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih paus umma/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pilih paus zayn/i,
      }),
    ).toBeInTheDocument();
  });

  it("menampilkan kombinasi board yang sesuai", async () => {
    const user = userEvent.setup();

    render(<SpacePuzzleScreen onSolved={() => undefined} />);

    const target = screen.getByRole("button", {
      name: /pasang potongan ke papan luar angkasa/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: /pilih paus umma/i,
      }),
    );
    await user.click(target);

    expect(screen.getByTestId("space-board-umma")).toHaveClass("opacity-100");

    await user.click(
      screen.getByRole("button", {
        name: /pilih paus zayn/i,
      }),
    );
    await user.click(target);

    expect(screen.getByTestId("space-board-umma-zayn")).toHaveClass(
      "opacity-100",
    );
  });

  it("selesai setelah ketiga paus terpasang", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();

    render(<SpacePuzzleScreen onSolved={onSolved} />);

    const target = screen.getByRole("button", {
      name: /pasang potongan ke papan luar angkasa/i,
    });

    for (const name of [
      /pilih paus aba/i,
      /pilih paus umma/i,
      /pilih paus zayn/i,
    ]) {
      await user.click(screen.getByRole("button", { name }));

      await user.click(target);
    }

    expect(screen.getByTestId("space-board-all")).toHaveClass("opacity-100");

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
