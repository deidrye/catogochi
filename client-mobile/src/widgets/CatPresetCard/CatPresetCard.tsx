import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { CatPresetT } from '@/entities/cat/model/types';

interface CatPresetCardProps {
  preset: CatPresetT;
  isSelected: boolean;
  onPress: () => void;
}

export const CatPresetCard: React.FC<CatPresetCardProps> = ({ preset, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={[styles.catCard, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: preset.imgMain }}
          style={styles.video}
          resizeMode='cover'
          repeat={true}
          paused={false}
          muted={true}
        />
      </View>
      <Text style={styles.catName}>{preset.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  catCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 25,
    elevation: 4,
    margin: 15,
    overflow: 'hidden',
    width: 280,
  },
  selectedCard: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  videoContainer: {
    width: 220,
    height: 220,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  catName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
  },
});
