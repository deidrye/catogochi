// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../../app/store';
// import { logout } from '../../features/auth/model/thunks';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../app/types/navigation';

// type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

// interface MainScreenProps {
//   navigation: MainScreenNavigationProp;
// }

// export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.auth.user);

//   const handleLogout = async () => {
//     await dispatch(logout());
//     navigation.navigate('Login');
//   };

//   const goToGame = () => {
//     navigation.navigate('Game');
//   };

//   const goToCreateCat = () => {
//     navigation.navigate('CreateCat');
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.title}>Добро пожаловать, {user?.user?.name}!</Text>
//         <TouchableOpacity style={styles.button} onPress={goToGame}>
//           <Text style={styles.buttonText}>Играть с котом</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={goToCreateCat}>
//           <Text style={styles.buttonText}>Создать кота</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleLogout}>
//           <Text style={styles.buttonText}>Выйти</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
