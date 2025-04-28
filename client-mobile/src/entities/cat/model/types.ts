export interface CatPreset {
  id: number;
  name: string;
  img: string;
}

export interface CatState {
  presets: CatPreset[];
  selectedPresetIndex: number;
  isLoading: boolean;
  error: string | null;
}

export interface CreateCatDto {
  name: string;
  catPresetId: number;
}
