import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MemoryAgeOneScreen } from "./memory-age-one-screen";

describe("MemoryAgeOneScreen", () => {
  it("menampilkan foto dan progress pertama", () => {
    render(<MemoryAgeOneScreen onContinue={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /zayn lagi bengong/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /Zayn lagi bengong/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/foto terbuka: 1 dari 4/i)).toBeInTheDocument();
  });

  it("menjalankan onContinue ketika tombol ditekan", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    render(<MemoryAgeOneScreen onContinue={onContinue} />);

    await user.click(
      screen.getByRole("button", {
        name: /puzzle berikutnya/i,
      }),
    );

    expect(onContinue).toHaveBeenCalledOnce();
  });
});
