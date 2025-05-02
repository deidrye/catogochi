import React, { memo, useMemo, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CatT } from '@/entities/cat/model/types';
import { useAppSelector } from '@/app/store';

// Static utility functions
const getIconForAction = (actionName: string) => {
  switch (actionName) {
    case 'Еда':
      return 'restaurant';
    case 'Игра':
      return 'toys';
    case 'Гладить':
      return 'favorite';
    case 'Спать':
      return 'bed';
    default:
      return 'pets';
  }
};

const getColorForAction = (actionName: string) => {
  switch (actionName) {
    case 'Еда':
      return '#28a745';
    case 'Игра':
      return '#007bff';
    case 'Гладить':
      return '#dc3545';
    case 'Спать':
      return '#6f42c1';
    default:
      return '#6c757d';
  }
};

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

const ActionButton: React.FC<ActionButtonProps> = memo(
  ({ title, iconName, color, onPress, disabled }) => {
    // Optional: Log to diagnose re-renders
    useEffect(() => {
      console.log(`ActionButton (${title}) rendered`);
    });

    return (
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
  },
  // Custom equality check for props
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.iconName === nextProps.iconName &&
      prevProps.color === nextProps.color &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.onPress === nextProps.onPress
    );
  },
);

const CatActionsWidget: React.FC<CatActionsWidgetProps> = memo(
  ({ cat, onAction, disabled }) => {
    const actions = useAppSelector((state) => state.cat.actions);

    useEffect(() => {
      console.log('CatActionsWidget rendered');
    });

    if (!cat || !actions) return null;

    const renderedButtons = useMemo(
      () =>
        actions.map((action) => (
          <ActionButton
            key={action.name}
            title={action.name}
            iconName={getIconForAction(action.name)}
            color={getColorForAction(action.name)}
            onPress={() => onAction(action.name)}
            disabled={disabled}
          />
        )),
      [actions, onAction, disabled],
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Действия с котом</Text>
        <View style={styles.buttonGrid}>{renderedButtons}</View>
      </View>
    );
  },
  // Custom equality check for props
  (prevProps, nextProps) => {
    return (
      prevProps.cat === nextProps.cat &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.onAction === nextProps.onAction
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    padding: 12,
    borderRadius: 10,
    width: '97%',
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
    width: '23%',
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

export default React.memo(CatActionsWidget);
