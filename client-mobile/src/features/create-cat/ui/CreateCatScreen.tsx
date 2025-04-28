// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image, // Добавлен импорт Image
// } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/app/types/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import { CatService } from '@/entities/cat/api/catService';

// type CreateCatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCat'>;

// interface CreateCatScreenProps {
//   navigation: CreateCatScreenNavigationProp;
// }

// export default function CreateCatScreen({ navigation }: CreateCatScreenProps) {
//   const { user } = useAuth();
//   const [selectedPreset, setSelectedPreset] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [presets, setPresets] = useState<Array<{ id: number; name: string; img: string }>>([]);
//   const [isLoadingPresets, setIsLoadingPresets] = useState(true);
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     loadPresets();
//   }, []);

//   const loadPresets = async () => {
//     try {
//       const data = await CatService.getPresets();
//       setPresets(data);
//     } catch (error) {
//       console.error('Error loading presets:', error);
//       Alert.alert('Ошибка', 'Не удалось загрузить пресеты котов');
//     } finally {
//       setIsLoadingPresets(false);
//     }
//   };

//   const currentPreset = presets[selectedPreset];

//   const handleCreateCat = async () => {
//     try {
//       if (!user?.user?.id) {
//         throw new Error('Пользователь не авторизован');
//       }

//       if (!currentPreset) {
//         throw new Error('Пресет не выбран');
//       }

//       setIsLoading(true);

//       const catData = {
//         name: currentPreset.name,
//         catPresetId: currentPreset.id,
//       };

//       const createdCat = await CatService.createCat(catData);

//       if (!createdCat) {
//         throw new Error('Не удалось создать кота');
//       }

//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Main' }],
//       });
//     } catch (error) {
//       console.error('Error creating cat:', error);
//       Alert.alert(
//         'Ошибка',
//         error instanceof Error ? error.message : 'Не удалось создать кота. Попробуйте еще раз.',
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNextPreset = () => {
//     setSelectedPreset((prev) => (prev + 1) % presets.length);
//     setImageError(false);
//   };

//   if (isLoadingPresets) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size='large' color='#6C63FF' />
//         <Text style={styles.loadingText}>Загружаем котиков...</Text>
//       </View>
//     );
//   }

//   if (!currentPreset) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noPresetsText}>Нет доступных пресетов 😿</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Выбери своего кота</Text>

//       <View style={styles.catCard}>
//         {imageError ? (
//           <Text style={styles.catImagePlaceholder}>🐱</Text>
//         ) : (
//           <Image
//             source={{ uri: 'https://img.freepik.com/free-vector/sweet-eyed-kitten-cartoon-character_1308-135596.jpg' }}
//             style={styles.catImage}
//             onError={() => setImageError(true)}
//           />
//         )}
//         <Text style={styles.catName}>{currentPreset.name}</Text>
//       </View>

//       <TouchableOpacity style={styles.switchButton} onPress={handleNextPreset}>
//         <Text style={styles.switchButtonText}>Другой котик</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.createButton, isLoading && styles.buttonDisabled]}
//         onPress={handleCreateCat}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color='#fff' />
//         ) : (
//           <Text style={styles.createButtonText}>Создать кота</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F9F9F9',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   catCard: {
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 30,
//     borderRadius: 20,
//     elevation: 4,
//     marginBottom: 30,
//   },
//   catImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   catImagePlaceholder: {
//     fontSize: 120,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   catName: {
//     fontSize: 26,
//     fontWeight: '600',
//     color: '#555',
//   },
//   switchButton: {
//     backgroundColor: '#6C63FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginBottom: 20,
//   },
//   switchButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   createButton: {
//     backgroundColor: '#FF6B6B',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#666',
//   },
//   noPresetsText: {
//     fontSize: 20,
//     color: '#999',
//   },
// });