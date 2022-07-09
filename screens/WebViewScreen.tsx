import React, { useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';
import CustomActivityIndicator from '../components/ActivityIndicator';

export default function WebViewScreen({navigation, route: {params}}) {
    const displayError = (e) => {
        Alert.alert(
            "Error",
            "Something went wrong! Check your internet connection or server",
            [
                { text: "OK", onPress: () => navigation.popToTop() },
            ],
            { cancelable: false }
        );
    };

    const handleMessage = (event) => {
        navigation.setOptions({ title: event.nativeEvent.title });
    };
    const INJECTED_JAVASCRIPT = `(function() {
        document.querySelector('header.bg-white.shadow').style.display = 'none';
        window.ReactNativeWebView.postMessage(JSON.stringify(window.title));
    })();`;

    return (
        <WebView
            style={styles.container}
            sharedCookiesEnabled={true}
            source={{ uri: `${params.server}/dashboard` }}
            startInLoadingState={true}
            onError={displayError}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            allowsBackForwardNavigationGestures
            onMessage={handleMessage}
            onLoadStart={() => {
                navigation.setOptions({ headerTitle: () => <CustomActivityIndicator /> });
            }}
            onLoadEnd={({nativeEvent}) => {
                 navigation.setOptions({ headerTitle: null, title: nativeEvent.title });
            }}
            renderLoading={() => <CustomActivityIndicator />}
         />
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
