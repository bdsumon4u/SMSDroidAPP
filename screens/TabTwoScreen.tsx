import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

Date.prototype.addMonths = function(m) {
  let date = new Date(this);
  let years = Math.floor(m / 12);
  let months = m - (years * 12);
  if (years) date.setFullYear(date.getFullYear() + years);
  if (months) date.setMonth(date.getMonth() + months);
  return date;
};

// set a cookie
CookieManager.set('http://islamic-qanda.com', {
  name: 'TOKEN',
  value: '1uLkusPNrvcuKF1Vj9UFxAt0hhb5wcJZD7Op04kl',
  path: '/',
  version: '1',
  expires: new Date().addMonths(6).toString()
}).then((done) => {
  console.log('CookieManager.set =>', done);
});

export default function TabTwoScreen() {
  return (
    <WebView sharedCookiesEnabled={true} source={{ uri: 'http://islamic-qanda.com/dashboard' }} />
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
