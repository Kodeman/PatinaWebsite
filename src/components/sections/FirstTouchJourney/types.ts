export interface Palette {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  responseMessage: string;
}

export interface PaletteSelection {
  selectedPalettes: string[];
  showResponse: boolean;
}
