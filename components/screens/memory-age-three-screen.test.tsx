import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MemoryAgeThreeScreen } from "./memory-age-three-screen";

describe("MemoryAgeThreeScreen", () => {
  it("menampilkan foto dan progress ketiga", () => {
    render(<MemoryAgeThreeScreen onContinue={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /zayn lagi berenang/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /Zayn lagi berenang/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/foto terbuka: 3 dari 4/i)).toBeInTheDocument();
  });

  it("menjalankan onContinue ketika tombol ditekan", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    render(<MemoryAgeThreeScreen onContinue={onContinue} />);

    await user.click(
      screen.getByRole("button", {
        name: /puzzle berikutnya/i,
      }),
    );

    expect(onContinue).toHaveBeenCalledOnce();
  });
});
