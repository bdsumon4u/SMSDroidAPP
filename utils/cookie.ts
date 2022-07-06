import CookieManager from '@react-native-cookies/cookies';

Date.prototype.addMonths = function(m) {
  let date = new Date(this);
  let years = Math.floor(m / 12);
  let months = m - (years * 12);
  if (years) date.setFullYear(date.getFullYear() + years);
  if (months) date.setMonth(date.getMonth() + months);
  return date;
};

export const setCookie = (url, name, value) => {
    CookieManager.set(url, {
      name,
      value,
      path: '/',
      version: '1',
      expires: new Date().addMonths(6).toString()
    }).then((done) => {
      console.log('CookieManager.set =>', done);
    });
}
