import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NoPresetsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noPresetsText}>Нет доступных пресетов 😿</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPresetsText: {
    fontSize: 20,
    color: '#999',
  },
});
