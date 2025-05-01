import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CatT } from '@/entities/cat/model/types';
import { useAppSelector } from '@/app/store';

type ActionButtonProps = {
  title: string;
  iconName: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
};

interface CatActionsWidgetProps {
  cat: CatT | null;
  onAction: (actionType: string) => void;
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
  const actions = useAppSelector((state) => state.cat.actions);

  if (!cat || !actions) return null;

  const getIconForAction = (actionName: string) => {
    switch (actionName) {
      case 'Покормить':
        return 'restaurant';
      case 'Поиграть':
        return 'toys';
      case 'Приласкать':
        return 'favorite';
      case 'Уложить спать':
        return 'bed';
      default:
        return 'pets';
    }
  };

  const getColorForAction = (actionName: string) => {
    switch (actionName) {
      case 'Покормить':
        return '#28a745';
      case 'Поиграть':
        return '#007bff';
      case 'Приласкать':
        return '#dc3545';
      case 'Уложить спать':
        return '#6f42c1';
      default:
        return '#6c757d';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Действия с котом</Text>
      <View style={styles.buttonGrid}>
        {actions.map((action) => (
          <ActionButton
            key={action.name}
            title={action.name}
            iconName={getIconForAction(action.name)}
            color={getColorForAction(action.name)}
            onPress={() => onAction(action.name)}
            disabled={disabled}
          />
        ))}
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
    aspectRatio: 1,
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
