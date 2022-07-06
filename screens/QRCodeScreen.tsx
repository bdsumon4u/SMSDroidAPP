import { StyleSheet, Button, Alert } from 'react-native';import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { onLoginSuccess } from '../utils/auth';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
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
      onLoginSuccess(JSON.parse(data), navigation);
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
