import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@habit_tracker_habits';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('habits');

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveHabits();
    }
  }, [habits]);

  useEffect(() => {
    const checkDayChange = () => {
      const today = getToday();
      const lastCheckDate = localStorage.getItem('lastCheckDate');

      if (lastCheckDate !== today) {
        resetDailyHabits();
        localStorage.setItem('lastCheckDate', today);
      }
    };

    checkDayChange();
    const interval = setInterval(checkDayChange, 3600000);
    return () => clearInterval(interval);
  }, []);

  const getToday = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  const resetDailyHabits = () => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        const yesterday = getYesterday();
        const wasCompletedYesterday = habit.completedDates?.includes(yesterday);

        return {
          ...habit,
          completed: false,
          streak: wasCompletedYesterday ? habit.streak : 0,
        };
      })
    );
  };

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedHabits !== null) {
        const parsedHabits = JSON.parse(savedHabits);
        const updatedHabits = parsedHabits.map(habit => ({
          ...habit,
          completedDates: habit.completedDates || [],
          streak: habit.streak || 0,
          bestStreak: habit.bestStreak || 0,
        }));
        setHabits(updatedHabits);
      } else {
        const defaultHabits = [
          {
            id: 1,
            name: '💧 Beber 2L de agua',
            completed: false,
            streak: 0,
            bestStreak: 0,
            completedDates: [],
            createdAt: getToday(),
          },
          {
            id: 2,
            name: '🏃 Hacer ejercicio',
            completed: false,
            streak: 0,
            bestStreak: 0,
            completedDates: [],
            createdAt: getToday(),
          },
          {
            id: 3,
            name: '📚 Leer 30 minutos',
            completed: false,
            streak: 0,
            bestStreak: 0,
            completedDates: [],
            createdAt: getToday(),
          },
          {
            id: 4,
            name: '🥗 Comer saludable',
            completed: false,
            streak: 0,
            bestStreak: 0,
            completedDates: [],
            createdAt: getToday(),
          },
        ];
        setHabits(defaultHabits);
      }
    } catch (error) {
      console.error('Error al cargar hábitos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error al guardar hábitos:', error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  };

  const toggleHabit = (id) => {
    const today = getToday();
    const yesterday = getYesterday();

    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const completedDates = habit.completedDates || [];
      const isCompletedToday = completedDates.includes(today);
      const wasCompletedYesterday = completedDates.includes(yesterday);

      if (!habit.completed) {
        let newStreak = habit.streak || 0;

        if (isCompletedToday) {
          newStreak = habit.streak;
        } else if (wasCompletedYesterday || newStreak === 0) {
          newStreak = newStreak + 1;
        } else {
          newStreak = 1;
        }

        const newBestStreak = Math.max(habit.bestStreak || 0, newStreak);
        const updatedDates = isCompletedToday
          ? completedDates
          : [...completedDates, today];

        return {
          ...habit,
          completed: true,
          streak: newStreak,
          bestStreak: newBestStreak,
          completedDates: updatedDates,
        };
      } else {
        let newStreak = habit.streak;
        let updatedDates = completedDates;

        if (isCompletedToday) {
          newStreak = Math.max(0, habit.streak - 1);
          updatedDates = completedDates.filter(date => date !== today);
        }

        return {
          ...habit,
          completed: false,
          streak: newStreak,
          completedDates: updatedDates,
        };
      }
    }));
  };

  const addHabit = () => {
    if (newHabitName.trim() === '') {
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: newHabitName.trim(),
      completed: false,
      streak: 0,
      bestStreak: 0,
      completedDates: [],
      createdAt: getToday(),
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setModalVisible(false);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🏆';
    if (streak >= 21) return '💎';
    if (streak >= 14) return '⭐';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '✨';
    return '🔥';
  };

  // Funciones de estadísticas
  const getTotalCompletions = () => {
    return habits.reduce((total, habit) => {
      return total + (habit.completedDates?.length || 0);
    }, 0);
  };

  const getBestOverallStreak = () => {
    return Math.max(...habits.map(h => h.bestStreak || 0), 0);
  };

  const getCompletionRate = () => {
    if (habits.length === 0) return 0;
    const last7Days = Array.from({ length: 7 }, (_, i) => getDaysAgo(i));
    const totalPossible = habits.length * 7;
    const totalCompleted = habits.reduce((count, habit) => {
      return count + last7Days.filter(day =>
        habit.completedDates?.includes(day)
      ).length;
    }, 0);
    return Math.round((totalCompleted / totalPossible) * 100);
  };

  const getLast7DaysData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      };
    });

    return last7Days.map(day => {
      const completed = habits.filter(habit =>
        habit.completedDates?.includes(day.date)
      ).length;
      return {
        ...day,
        completed,
        total: habits.length,
        percentage: habits.length > 0 ? (completed / habits.length) * 100 : 0,
      };
    });
  };

  const getMostConsistentHabit = () => {
    if (habits.length === 0) return null;
    return habits.reduce((best, habit) => {
      const habitStreak = habit.bestStreak || 0;
      const bestStreak = best?.bestStreak || 0;
      return habitStreak > bestStreak ? habit : best;
    }, habits[0]);
  };

  const suggestedEmojis = ['💧', '🏃', '📚', '🥗', '🧘', '💪', '🎯', '✍️', '🎨', '🎵'];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Pantalla de estadísticas
  if (currentView === 'stats') {
    const last7DaysData = getLast7DaysData();
    const mostConsistent = getMostConsistentHabit();

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setCurrentView('habits')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Estadísticas</Text>
        </View>

        <ScrollView style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{getTotalCompletions()}</Text>
              <Text style={styles.statLabel}>Completados</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{getBestOverallStreak()}</Text>
              <Text style={styles.statLabel}>Mejor Racha</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{getCompletionRate()}%</Text>
              <Text style={styles.statLabel}>Tasa (7d)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{habits.length}</Text>
              <Text style={styles.statLabel}>Hábitos</Text>
            </View>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Últimos 7 días</Text>
            <View style={styles.chart}>
              {last7DaysData.map((day, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={styles.barContainer}>
                    <View style={[
                      styles.bar,
                      { height: `${day.percentage}%` }
                    ]} />
                  </View>
                  <Text style={styles.barLabel}>{day.label}</Text>
                  <Text style={styles.barValue}>
                    {day.completed}/{day.total}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Hábitos por racha</Text>
            {habits
              .sort((a, b) => (b.streak || 0) - (a.streak || 0))
              .map(habit => (
                <View key={habit.id} style={styles.habitStatCard}>
                  <View style={styles.habitStatInfo}>
                    <Text style={styles.habitStatName}>{habit.name}</Text>
                    <Text style={styles.habitStatStreak}>
                      {getStreakEmoji(habit.streak)} {habit.streak} días
                    </Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${Math.min((habit.streak / 30) * 100, 100)}%`
                        }
                      ]}
                    />
                  </View>
                </View>
              ))}
          </View>

          {mostConsistent && (
            <View style={styles.chartSection}>
              <Text style={styles.sectionTitle}>⭐ Hábito Campeón</Text>
              <View style={styles.championCard}>
                <Text style={styles.championName}>{mostConsistent.name}</Text>
                <Text style={styles.championStreak}>
                  🏆 Mejor racha: {mostConsistent.bestStreak} días
                </Text>
                <Text style={styles.championCurrent}>
                  Racha actual: {mostConsistent.streak} días
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Pantalla principal
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mis Hábitos</Text>
          <Text style={styles.headerDate}>{getCurrentDate()}</Text>
          <Text style={styles.headerSubtitle}>
            {habits.filter(h => h.completed).length} de {habits.length} completados hoy
          </Text>
        </View>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => setCurrentView('stats')}
        >
          <Text style={styles.statsButtonText}>📊</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.habitList}>
        {habits.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes hábitos aún</Text>
            <Text style={styles.emptySubtext}>Toca el botón "+" para agregar uno</Text>
          </View>
        ) : (
          habits.map(habit => (
            <TouchableOpacity
              key={habit.id}
              style={styles.habitCard}
              onPress={() => toggleHabit(habit.id)}
              onLongPress={() => {
                if (confirm('¿Eliminar este hábito?')) {
                  deleteHabit(habit.id);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.habitInfo}>
                <Text style={[
                  styles.habitName,
                  habit.completed && styles.habitNameCompleted
                ]}>
                  {habit.name}
                </Text>
                <View style={styles.streakContainer}>
                  {habit.streak > 0 && (
                    <Text style={styles.streak}>
                      {getStreakEmoji(habit.streak)} {habit.streak} día{habit.streak !== 1 ? 's' : ''}
                    </Text>
                  )}
                  {habit.bestStreak > 0 && habit.bestStreak !== habit.streak && (
                    <Text style={styles.bestStreak}>
                      Mejor: {habit.bestStreak}
                    </Text>
                  )}
                </View>
              </View>

              <View style={[
                styles.checkbox,
                habit.completed && styles.checkboxCompleted
              ]}>
                {habit.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Nuevo Hábito</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Hábito</Text>

            <Text style={styles.label}>Nombre del hábito:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 💧 Beber 2L de agua"
              placeholderTextColor="#64748b"
              value={newHabitName}
              onChangeText={setNewHabitName}
              autoFocus
            />

            <Text style={styles.label}>Emojis sugeridos:</Text>
            <View style={styles.emojiContainer}>
              {suggestedEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.emojiButton}
                  onPress={() => setNewHabitName(newHabitName + emoji)}
                >
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setNewHabitName('');
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addHabit}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    backgroundColor: '#0f3460',
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerDate: {
    fontSize: 14,
    color: '#94a3b8',
    textTransform: 'capitalize',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 5,
  },
  statsButton: {
    backgroundColor: '#1e40af',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsButtonText: {
    fontSize: 24,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  habitList: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 14,
  },
  habitCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2a3f5f',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streak: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  bestStreak: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos de estadísticas
  statsContainer: {
    flex: 1,
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3f5f',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  chartSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2a3f5f',
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barContainer: {
    height: 140,
    width: 30,
    backgroundColor: '#0f3460',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    backgroundColor: '#3b82f6',
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 5,
  },
  barValue: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
  },
  habitStatCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a3f5f',
  },
  habitStatInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitStatName: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  habitStatStreak: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#0f3460',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  championCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  championName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  championStreak: {
    fontSize: 16,
    color: '#f59e0b',
    marginBottom: 5,
  },
  championCurrent: {
    fontSize: 14,
    color: '#94a3b8',
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2a3f5f',
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 20,
  },
  emojiButton: {
    padding: 8,
    margin: 4,
    backgroundColor: '#0f3460',
    borderRadius: 8,
  },
  emoji: {
    fontSize: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#374151',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
