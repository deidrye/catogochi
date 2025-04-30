import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CatT } from '@/entities/cat/model/types';

type ActionButtonProps = {
  title: string;
  iconName: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
};

interface CatActionsWidgetProps {
  cat: CatT | null;
  onAction: (actionType: 'Покормить' | 'Поиграть' | 'Приласкать' | 'Уложить спать') => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  iconName,
  color,
  onPress,
  disabled,
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: disabled ? '#ccc' : color },
      pressed && !disabled ? styles.buttonPressed : null,
    ]}
    accessibilityLabel={`Кнопка ${title}`}
  >
    <View style={styles.buttonContent}>
      <Icon name={iconName} size={18} color='#fff' />
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </Pressable>
);

const CatActionsWidget: React.FC<CatActionsWidgetProps> = ({ cat, onAction, disabled }) => {
  if (!cat) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Действия с котом</Text>
      <View style={styles.buttonGrid}>
        <ActionButton
          title='Еда'
          iconName='restaurant'
          color='#28a745'
          onPress={() => onAction('Покормить')}
          disabled={disabled}
        />
        <ActionButton
          title='Поиграть'
          iconName='toys'
          color='#007bff'
          onPress={() => onAction('Поиграть')}
          disabled={disabled}
        />
        <ActionButton
          title='Приласкать'
          iconName='favorite'
          color='#dc3545'
          onPress={() => onAction('Приласкать')}
          disabled={disabled}
        />
        <ActionButton
          title='Уложить спать'
          iconName='bed'
          color='#6f42c1'
          onPress={() => onAction('Уложить спать')}
          disabled={disabled}
        />
        <ActionButton title='Игра' iconName='toys' color='#007bff' onPress={handlePlay} />
        <ActionButton title='Ласка' iconName='favorite' color='#dc3545' onPress={handlePet} />
        <ActionButton title='Сон' iconName='bed' color='#6f42c1' onPress={handleSleep} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    padding: 12,
    borderRadius: 10,
    width: '95%',
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '21%',
    aspectRatio: 1, // сохраняет квадратную форму
    borderRadius: 12,
    marginHorizontal: 2,
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
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CatActionsWidget;
