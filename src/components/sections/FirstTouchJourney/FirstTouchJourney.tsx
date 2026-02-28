"use client";

import { useState, useCallback } from "react";
import { VoidTransition } from "./VoidTransition";
import { QuestionReveal } from "./QuestionReveal";
import { PaletteGrid } from "./PaletteGrid";
import { ResponseMessage } from "./ResponseMessage";
import { ContinueCTA } from "./ContinueCTA";
import { getCombinedResponseMessage, palettes } from "./palettes";
import type { PaletteSelection } from "./types";

interface FirstTouchJourneyProps {
  /** ID of the section to scroll to after selection */
  continueTargetId?: string;
}

/**
 * FirstTouchJourney - Main orchestrating container
 * Manages the cinematic scroll journey: Void → Question → Palettes → Response → Continue
 */
export function FirstTouchJourney({
  continueTargetId = "makers",
}: FirstTouchJourneyProps) {
  const [selection, setSelection] = useState<PaletteSelection>({
    selectedPalettes: [],
    showResponse: false,
  });

  const handlePaletteSelect = useCallback((paletteId: string) => {
    setSelection((prev) => {
      const isSelected = prev.selectedPalettes.includes(paletteId);
      let newSelection: string[];

      if (isSelected) {
        newSelection = prev.selectedPalettes.filter((id) => id !== paletteId);
      } else if (prev.selectedPalettes.length >= 3) {
        newSelection = [...prev.selectedPalettes.slice(1), paletteId];
      } else {
        newSelection = [...prev.selectedPalettes, paletteId];
      }

      // Persist style preferences to localStorage for the founding signup form
      try {
        const names = newSelection
          .map((id) => palettes.find((p) => p.id === id)?.name)
          .filter(Boolean);
        localStorage.setItem('patina_style_preferences', JSON.stringify(names));
      } catch {
        // localStorage unavailable
      }

      return {
        selectedPalettes: newSelection,
        showResponse: newSelection.length > 0,
      };
    });
  }, []);

  const responseMessage = getCombinedResponseMessage(selection.selectedPalettes);

  return (
    <div id="first-touch">
      {/* The Void - 60vh of darkness */}
      <VoidTransition />

      {/* The Question Reveals */}
      <QuestionReveal />

      {/* The Choices Emerge */}
      <PaletteGrid
        selectedPalettes={selection.selectedPalettes}
        onSelect={handlePaletteSelect}
      />

      {/* Response Message - Appears after selection */}
      <ResponseMessage
        message={responseMessage}
        isVisible={selection.showResponse}
      />

      {/* Continue CTA - Scrolls to next section */}
      <ContinueCTA
        isVisible={selection.showResponse}
        targetId={continueTargetId}
      />
    </div>
  );
}
