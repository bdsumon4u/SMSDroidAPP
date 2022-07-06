import React, {useState} from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getToken } from '../utils/api';
import { onLoginSuccess } from '../utils/auth';
import RNLoginScreen from "react-native-login-screen";

export default function LoginScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  let _server = 'https://islamic-qanda.com', _email = '', _password = '', _typing = false;

  const [error, setError] = useState('');

  const onLoginPress = () => {
      _typing = false;
      setError('');

      if (!(_server && _email && _password)) {
        return setError('Server, Email, Password are required.')
      }

      if (!_server.match(/^https?:\/\//)) {
        _server='http://' + _server;
      }
      getToken(_server, _email, _password)
          .then(({data}) => {
            if(data){
              onLoginSuccess(data, navigation);
            }else{
              setError('Invalid Response');
              throw new Error(error)
            }
          }).catch((err) => {
            setError(err.response.data.message);
          });
  }

  return (
    <View style={styles.container}>
        <RNLoginScreen
        //       logoImageSource={require("./assets/logo-example.png")}
              disableSignup
              disableSocialButtons
              onLoginPress={onLoginPress}
              onEmailChange={(email: string) => {_email = email; _typing = true}}
              onPasswordChange={(password: string) => {_password = password; _error = true}}
        >
            <Button title="Login Using QR Code" onPress={() => navigation.navigate('QRCodeScreen')}></Button>
            {_typing || <Text style={styles.error_message}>{error}</Text>}
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
  error_message: {
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
  }
});
