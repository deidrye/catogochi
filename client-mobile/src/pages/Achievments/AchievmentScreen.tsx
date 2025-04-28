import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchAchieves, fetchAchievesOfUser } from '@/entities/achievements/model/thunks';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function AchievementsScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const achievements = useAppSelector((store) => store.achievements.list);
  const userAchievements = useAppSelector((store) => store.achievements.userAchieves);

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
      <Text style={styles.header}>Мои достижения</Text>

      {sortedAchievements.map((achieve) => {
        const isCompleted = userAchievements.some((ua) => ua.id === achieve.id);

        return (
          <View
            key={achieve.id}
            style={[styles.card, isCompleted ? styles.completedCard : styles.incompleteCard]}
          >
            <View style={styles.cardHeader}>
              {/* {isCompleted && (
                <Image 
                  source={require('@/shared/assets/icons/checkmark.png')}
                  style={styles.badgeIcon}
                />
              )} */}
              <Text style={styles.cardTitle}>{achieve.name}</Text>
            </View>

            <Text style={styles.cardDescription}>{achieve.description}</Text>

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardLabel}>Награда:</Text>
              {/* <Image 
                source={require('@/shared/assets/icons/fish.png')}
                style={styles.fishIcon}
              /> */}
              <Text style={styles.rewardText}>{achieve.reward} рыбок</Text>
            </View>

            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Подробнее</Text>
            </TouchableOpacity>

            {isCompleted && (
              <Text style={styles.completedText}>
                Получено: {new Date(achieve.createdAt).toLocaleDateString()}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
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
  badgeIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
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
  fishIcon: {
    width: 24,
    height: 24,
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
});
