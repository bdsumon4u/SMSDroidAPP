/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import {navigationRef} from './ref';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { authUserData } from '../utils/auth';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import WebViewRight from '../components/WebViewRight';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  useEffect( ()=>{
      (async ()=>{
        const data = await authUserData()
        if (data.server && data.token){
          navigationRef.current.navigate("WebViewScreen", data);
        }
      })()

    },[])
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} options={{ headerShown: true, title: 'Scan QR Code' }} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ headerBackVisible: false, title: 'XMS Panel', headerRight:()=> <WebViewRight/> }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
