import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MemoryAgeTwoScreen } from "./memory-age-two-screen";

describe("MemoryAgeTwoScreen", () => {
  it("menampilkan foto dan progress kedua", () => {
    render(<MemoryAgeTwoScreen onContinue={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /zayn lagi bobo/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /Zayn lagi bobo/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/foto terbuka: 2 dari 4/i)).toBeInTheDocument();
  });

  it("menjalankan onContinue ketika tombol ditekan", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    render(<MemoryAgeTwoScreen onContinue={onContinue} />);

    await user.click(
      screen.getByRole("button", {
        name: /puzzle berikutnya/i,
      }),
    );

    expect(onContinue).toHaveBeenCalledOnce();
  });
});
