import { useAppSelector } from '@/app/store';
import { CatT } from '@/entities/cat/model/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

type StatProps = {
  label: string;
  value: number;
  color: string;
};

const StatRow: React.FC<StatProps> = ({ label, value, color }) => (
  <>
    <View style={styles.statRow}>
      <Text style={styles.statLabel} accessibilityLabel={`Метка ${label}`}>
        {label}:
      </Text>
      <Text style={styles.statValue}>{value}%</Text>
    </View>
    <Progress.Bar progress={value / 100} width={null} color={color} style={styles.progressBar} />
  </>
);

const CatStatsWidget: React.FC<{ cat: CatT | null }> = ({ cat }) => {
  if (!cat) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статистика состояния кота</Text>
      <StatRow label='Злость' value={cat.angry} color='#FF6347' />
      <StatRow label='Здоровье' value={cat.hp} color='#32CD32' />
      <StatRow label='Энергия' value={cat.energy} color='#FFD700' />
      <StatRow label='Ласка' value={cat.affection} color='#FF69B4' />
      <StatRow label='Наглость' value={cat.boldness} color='#3b9eff' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#fff',
  },
  statValue: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 8,
    marginBottom: 20,
  },
});

export default CatStatsWidget;
