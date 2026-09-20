import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("test environment", () => {
  it("dapat menemukan tombol Ayo Main", () => {
    render(<button>Ayo Main!</button>);

    const playButton = screen.getByRole("button", {
      name: /ayo main/i,
    });

    expect(playButton).toBeInTheDocument();
  });
});
