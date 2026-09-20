import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScreenShell } from "./screen-shell";

describe("ScreenShell", () => {
  it("menampilkan konten utama di dalam layar", () => {
    render(
      <ScreenShell>
        <h1>Assalamualaikum Zayn</h1>
      </ScreenShell>,
    );

    const mainContent = screen.getByRole("main");
    const heading = screen.getByRole("heading", {
      name: /assalamualaikum zayn/i,
    });

    expect(mainContent).toContainElement(heading);
  });
});
