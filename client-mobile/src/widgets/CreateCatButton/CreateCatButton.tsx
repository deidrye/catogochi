import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface CreateCatButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

export const CreateCatButton: React.FC<CreateCatButtonProps> = ({ isLoading, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.createButton, isLoading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color='#fff' />
      ) : (
        <Text style={styles.createButtonText}>Создать кота</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
