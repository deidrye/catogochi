import { useAppDispatch, useAppSelector } from '@/app/store';
import { setShowModal } from '@/entities/log/model/slice';
import { fetchLogs } from '@/entities/log/model/thunks';
import { resLogT } from '@/entities/log/model/types';
import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const HistoryModal = () => {
  // Здесь можно получить данные истории из хранилища
  const dispatch = useAppDispatch();
  const logData = useAppSelector((state) => state.log.list);
  const showModal = useAppSelector((state) => state.log.showModal);
  const user = useAppSelector((store) => store.auth.user?.user);

  useEffect(() => {
    if (showModal) {
      async function main() {
        await dispatch(fetchLogs(user?.id!));
      }
      main();
    }
  }, [showModal]);

  function parseLogType(log: resLogT) {
    const result = { name: '', description: '' };

    switch (log.type) {
      case 'BuyToy':
        result.name = `Куплена игрушка: ${log.Toy!.name} [потрачено: ${log.Toy?.price} рыбок]`;
        // result.description = `Потрачено ${log.Toy!.price} рыбок`;
        break;

      case 'Basic':
      case 'Achievement':
        result.name = 'Получено достижение!';
        // result.description = 'Поздравляем с новым достижением';
        break;

      case 'Feed':
        result.name = 'Вы покормили кота!';
        // result.description = 'Вы покормили кота!';
        break;

      case 'Meow':
        result.name = 'Взаимодействие';
        // result.description = 'Вы погладили кота!';
        break;

      case 'CatPlay':
        result.name = 'Игра с котом';
        // result.description = 'Вы поиграли с котом';
        break;

      case 'ToyGame':
        result.name = `Вы поиграли с котом игрушкой: ${log.Toy?.name}`;
        break;

      case 'randomEvent':
        result.name = `${log.Event.title}`;
        break;

      default:
        result.name = 'Отдых кота';
      // result.description = 'Вы уложили кота спать!';
    }

    return result;
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>История действий</Text>

          {logData?.length > 0 ? (
            <ScrollView style={styles.modalContent}>
              {logData.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyDate}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.historyAction}>{parseLogType(item).name}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noHistoryText}>История действий пуста</Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => dispatch(setShowModal(false))}
          >
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    marginBottom: 20,
    maxHeight: '70%',
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyDate: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  historyAction: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    paddingVertical: 20,
  },
  closeButton: {
    backgroundColor: '#CD5C5C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});

export default HistoryModal;
