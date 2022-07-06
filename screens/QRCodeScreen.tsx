import { StyleSheet, Button, Alert } from 'react-native';import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { storage } from '../constants/Server';
import { setData } from '../utils/storage';
import { setCookie } from '../utils/cookie';
import { addDevice } from '../utils/api';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import DeviceInfo from 'react-native-device-info';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const onBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      try {
          data = JSON.parse(data);
          if (data && data.hasOwnProperty("token") && data.hasOwnProperty("server")) {
            setData(storage.server, data.server).catch(() => {
              throw new Error("Failed to store server");
            });
            setData(storage.token, data.token).catch(() => {
              throw new Error("Failed to store token");
            });
            setCookie(data.server, 'TOKEN', data.token);

            addDevice({
              "name": Device.brand,
              "model": Device.modelName,
              "version": Device.platformApiLevel,
              "app_version": DeviceInfo.getVersion(),
              "unique_id": DeviceInfo.getUniqueId(),
            }).then((res) => {
              console.log(res)
              navigation.navigate("WebViewScreen", data);
            }).catch((err) => {
              const messages = err.response.data.message;
              let alertMessage = "";
              if (typeof messages == "object") {
                for (const key in messages) {
                  alertMessage += messages[key][0] + "\n\r";
                }
              } else {
                alertMessage = messages;
              }
              Alert.alert("Invalid QR Code", alertMessage, [
                {
                  text: "Ok",
                  onPress: () => {
                    navigation.navigate("LoginScreen");
                  },
                },
              ]);
            });
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
    };

    if (hasPermission === null) {
      // return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      // return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
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
