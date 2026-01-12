"use client";

import { useState, useCallback } from "react";
import { VoidTransition } from "./VoidTransition";
import { QuestionReveal } from "./QuestionReveal";
import { PaletteGrid } from "./PaletteGrid";
import { ResponseMessage } from "./ResponseMessage";
import { ContinueCTA } from "./ContinueCTA";
import { getCombinedResponseMessage } from "./palettes";
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

      if (isSelected) {
        // Deselect
        const newSelection = prev.selectedPalettes.filter((id) => id !== paletteId);
        return {
          selectedPalettes: newSelection,
          showResponse: newSelection.length > 0,
        };
      }

      if (prev.selectedPalettes.length >= 3) {
        // Max reached, replace oldest selection
        const newSelection = [...prev.selectedPalettes.slice(1), paletteId];
        return {
          selectedPalettes: newSelection,
          showResponse: true,
        };
      }

      // Add selection
      return {
        selectedPalettes: [...prev.selectedPalettes, paletteId],
        showResponse: true,
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
