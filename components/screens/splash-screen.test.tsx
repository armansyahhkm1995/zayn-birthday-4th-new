import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SplashScreen } from "./splash-screen";

describe("SplashScreen", () => {
  it("menampilkan sambutan dan menjalankan onPlay", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();

    render(<SplashScreen onPlay={onPlay} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /assalamualaikum zayn/i,
      }),
    ).toBeInTheDocument();

    const playButton = screen.getByRole("button", {
      name: /ayo main/i,
    });

    await user.click(playButton);

    expect(onPlay).toHaveBeenCalledOnce();
  });
});
