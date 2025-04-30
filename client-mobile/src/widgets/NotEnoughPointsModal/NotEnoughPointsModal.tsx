import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NotEnoughPointsModalProps {
  visible: boolean;
  onClose: () => void;
  toyName: string;
  toyPrice: number;
  currentPoints: number;
}

export const NotEnoughPointsModal: React.FC<NotEnoughPointsModalProps> = ({
  visible,
  onClose,
  toyName,
  toyPrice,
  currentPoints,
}) => {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Недостаточно рыбок</Text>
          <Text style={styles.message}>
            Для покупки нужно {toyPrice} рыбок.
          </Text>
          <Text style={styles.message}>
            Ваш баланс {currentPoints}.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Ок</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
