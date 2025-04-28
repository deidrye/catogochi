import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CatPresetT } from '@/entities/cat/model/types';

interface CatPresetCardProps {
  preset: CatPresetT;
  isSelected: boolean;
  onPress: () => void;
}

export const CatPresetCard: React.FC<CatPresetCardProps> = ({ preset, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={[styles.catCard, isSelected && styles.selectedCard]} onPress={onPress}>
      <Image
        source={{
          uri: preset.img,
        }}
        style={styles.catImage}
      />
      <Text style={styles.catName}>{preset.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  catCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    margin: 10,
  },
  selectedCard: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  catImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  catName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
});
