import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BirthdayRevealScreen } from "./birthday-reveal-screen";

describe("BirthdayRevealScreen", () => {
  it("menampilkan ucapan dan foto utama", () => {
    render(<BirthdayRevealScreen onReadLetter={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /selamat ulang tahun ke-4 zayn/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /zayn tersenyum di depan kue/i,
      }),
    ).toBeInTheDocument();
  });

  it("membuka pesan Daddy", async () => {
    const user = userEvent.setup();
    const onReadLetter = vi.fn();

    render(<BirthdayRevealScreen onReadLetter={onReadLetter} />);

    await user.click(
      screen.getByRole("button", {
        name: /baca pesan daddy/i,
      }),
    );

    expect(onReadLetter).toHaveBeenCalledOnce();
  });
});
