"use client";

import { useEffect } from "react";

import { playSound, preloadSounds } from "@/lib/audio";

export function useGlobalInteractionSound() {
  useEffect(() => {
    preloadSounds();

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const button = target.closest("button");

      if (!button) return;
      if (button.hasAttribute("disabled")) return;

      if (button.dataset.interactionSound === "off") {
        return;
      }

      playSound("interaction");
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);
}
