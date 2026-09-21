import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DaddyLetterScreen } from "./daddy-letter-screen";

describe("DaddyLetterScreen", () => {
  it("menampilkan surat dan foto keluarga", () => {
    render(<DaddyLetterScreen onReplay={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /for our little lego builder Aba & Umma/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/hari ini zayn sudah 4 tahun/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/my little lego builder/i)).toBeInTheDocument();
  });

  it("mengulang permainan dari awal", async () => {
    const user = userEvent.setup();
    const onReplay = vi.fn();

    render(<DaddyLetterScreen onReplay={onReplay} />);

    await user.click(
      screen.getByRole("button", {
        name: /main lagi dari awal/i,
      }),
    );

    expect(onReplay).toHaveBeenCalledOnce();
  });
});
