import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RNLoginScreen from "react-native-login-screen";

export default function LoginScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
        <RNLoginScreen
        //       logoImageSource={require("./assets/logo-example.png")}
              disableSignup
              disableSocialButtons
              onLoginPress={() => {}}
              onEmailChange={(email: string) => {}}
              onPasswordChange={(password: string) => {}}
        >
            <Button title="Login Using QR Code" onPress={() => navigation.navigate('QRCodeScreen')}></Button>
        </RNLoginScreen>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
