import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CatT } from '@/entities/cat/model/types';

type ActionButtonProps = {
  title: string;
  iconName: string;
  color: string;
  onPress: () => void;
};

interface CatActionsWidgetProps {
  cat: CatT | null;
  onAction: (actionType: 'Покормить' | 'Поиграть' | 'Приласкать' | 'Уложить спать') => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, iconName, color, onPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: color },
      pressed ? styles.buttonPressed : {},
    ]}
    onPress={onPress}
    accessibilityLabel={`Кнопка ${title}`}
  >
    <View style={styles.buttonContent}>
      <Icon name={iconName} size={18} color='#fff' style={styles.icon} />
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </Pressable>
);

// Основной компонент виджета
const CatActionsWidget: React.FC<CatActionsWidgetProps> = ({ cat, onAction }) => {
  const handleAction = (actionType: 'Покормить' | 'Поиграть' | 'Приласкать' | 'Уложить спать') => {
    if (!cat) {
      return;
    }
    onAction(actionType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Действия с котом</Text>
      <View style={styles.buttonGrid}>
        <ActionButton
          title='Покормить'
          iconName='restaurant'
          color='#28a745'
          onPress={() => handleAction('Покормить')}
        />
        <ActionButton
          title='Поиграть'
          iconName='toys'
          color='#007bff'
          onPress={() => handleAction('Поиграть')}
        />
        <ActionButton
          title='Приласкать'
          iconName='favorite'
          color='#dc3545'
          onPress={() => handleAction('Приласкать')}
        />
        <ActionButton
          title='Уложить спать'
          iconName='bed'
          color='#6f42c1'
          onPress={() => handleAction('Уложить спать')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CatActionsWidget;
