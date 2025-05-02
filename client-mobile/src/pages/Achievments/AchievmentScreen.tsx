import { useAppDispatch, useAppSelector } from '@/app/store';
import { RootStackParamList } from '@/app/types/navigation';
import { fetchAchieves, fetchAchievesOfUser } from '@/entities/achievements/model/thunks';
import { clearCat, setOffline } from '@/entities/cat/model/slice';
import { setShowModal } from '@/entities/log/model/slice';
import { logout } from '@/features/auth/model/thunks';
import HistoryModal from '@/widgets/HistoryModal/HistoryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import Toast from 'react-native-root-toast';

type MainNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AchievementsScreen() {
  const navigation = useNavigation<MainNavigationProp>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const achievements = useAppSelector((store) => store.achievements.list);
  const userAchievements = useAppSelector((store) => store.achievements.userAchieves);

  const logoutFunc = async () => {
    await dispatch(logout()).unwrap();
    AsyncStorage.clear();
    void dispatch(clearCat());
    void dispatch(setOffline());
  };

  useEffect(() => {
    dispatch(fetchAchievesOfUser(user?.user.id!));
    void dispatch(fetchAchieves());
  }, []);

  // Сортируем достижения: полученные сверху
  const sortedAchievements = [...achievements].sort((a, b) => {
    const aCompleted = userAchievements.some((ua) => ua.id === a.id);
    const bCompleted = userAchievements.some((ua) => ua.id === b.id);
    return bCompleted ? 1 : aCompleted ? -1 : 0;
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Блок с информацией пользователя */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userMainRow}>
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>{user?.user.name}</Text>
            <Text style={styles.userEmail}>{user?.user.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => dispatch(setShowModal(true))}
            activeOpacity={0.7}
          >
            <Text style={styles.historyButtonText}>История</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutFunc} activeOpacity={0.7}>
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Мои достижения</Text>

      {sortedAchievements.map((achieve) => {
        const isCompleted = userAchievements.some((ua) => ua.id === achieve.id);

        return (
          <View
            key={achieve.id}
            style={[styles.card, isCompleted ? styles.completedCard : styles.incompleteCard]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{achieve.name}</Text>
            </View>

            <Text style={styles.cardDescription}>{achieve.description}</Text>

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardLabel}>Награда:</Text>
              <Text style={styles.rewardText}>{achieve.reward} рыбок</Text>
            </View>

            {/* <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Подробнее</Text>
            </TouchableOpacity> */}

            {isCompleted && (
              <Text style={styles.completedText}>
                Получено: {new Date(achieve.createdAt).toLocaleDateString()}
              </Text>
            )}
          </View>
        );
      })}
      <HistoryModal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userTextContainer: {
    marginRight: 10, // отступ между данными пользователя и кнопкой "История"
  },
  historyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userEmail: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 1, // Добавьте это свойство
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  completedCard: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 6,
    borderLeftColor: '#4caf50',
  },
  incompleteCard: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 6,
    borderLeftColor: '#9e9e9e',
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    flex: 1,
  },
  cardDescription: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
    lineHeight: 24,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardLabel: {
    fontSize: 18,
    color: '#666',
    marginRight: 8,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9800',
  },
  detailsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#2196f3',
    marginBottom: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  completedText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4caf50',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // или marginHorizontal между кнопками
  },
});
