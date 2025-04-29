import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CatPresetT } from '@/entities/cat/model/types';
import { ResizeMode, Video } from 'expo-av';

interface CatPresetCardProps {
  preset: CatPresetT;
  isSelected: boolean;
  onPress: () => void;
}

export const CatPresetCard: React.FC<CatPresetCardProps> = ({ preset, isSelected, onPress }) => {
  const videoRef = useRef<Video>(null);

  return (
    <TouchableOpacity style={[styles.catCard, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: preset.imgCreate }}
          style={styles.video}
          videoStyle={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          isMuted
          shouldPlay
          useNativeControls={false}
        />
      </View>
      <Text style={styles.catName}>{preset.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  catCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    margin: 12,
    overflow: 'hidden',
    width: 260,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  selectedCard: {
    borderColor: '#FF6B6B',
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.5,
  },
  videoContainer: {
    width: 240,
    height: 240,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center', // Добавлено для центрирования содержимого
    flex: 1,
  },
  video: {
    width: 220,
    height: 220,
  },
  catName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
