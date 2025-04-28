import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CatPresetT } from '@/entities/cat/model/types';
import { CatPresetCard } from '../CatPresetCard/CatPresetCard';

interface CatPresetListProps {
  presets: CatPresetT[];
  selectedPreset: CatPresetT | null;
  onPresetSelect: (preset: CatPresetT) => void;
}

export const CatPresetList: React.FC<CatPresetListProps> = ({
  presets,
  selectedPreset,
  onPresetSelect,
}) => {
  return (
    <View style={styles.presetList}>
      {presets.map((preset) => (
        <CatPresetCard
          key={preset.id}
          preset={preset}
          isSelected={selectedPreset?.id === preset.id}
          onPress={() => onPresetSelect(preset)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  presetList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
