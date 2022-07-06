import {Alert} from 'react-native';
import { storage } from '../constants/Server';
import { setData, getData } from '../utils/storage';
import { setCookie } from '../utils/cookie';
import { addDevice } from '../utils/api';

export const authUserData = async () => {
    try {
        return {
            server: await getData(storage.server),
            token: await getData(storage.token),
        }
    } catch (e) {
        console.log('authUserData', e)
    }
}

export const onLoginSuccess = (data, navigation) => {
    try {
      if (data && data.hasOwnProperty("token") && data.hasOwnProperty("server")) {
        setData(storage.server, data.server).catch(() => {
          throw new Error("Failed to store server");
        });
        setData(storage.token, data.token).catch(() => {
          throw new Error("Failed to store token");
        });
        setCookie(data.server, 'TOKEN', data.token);

        addDevice(data, navigation);
      } else {
        throw new Error("Invalid Json");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Invalid QR Code", "Please scan the valid qr code", [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("LoginScreen");
          },
        },
      ]);
    }
}