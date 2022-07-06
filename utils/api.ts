import axios from "axios";
import * as Device from 'expo-device';
import DeviceInfo from 'react-native-device-info';
import { getData, setData } from "./storage";
import { storage } from "../constants/Server";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(async (request) => {
  const server = await getData(storage.server);
  const token = await getData(storage.token);
  request.headers["Content-Type"] = "application/json";
  request.headers["Accept"] = "application/json";

  if (server) {
    request.baseURL = server + "/api/";
  }
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
}, error => {
  console.log(error.response.status);
  return Promise.reject(error);
});

export const getToken = (_server, _email, _password) => {
    setData(storage.server, _server);
    console.log('getToken', _server, _email, _password)
    return axios.post('sanctum/token', {
        email: _email,
        password: _password,
    })
}

export const addDevice = (data, navigation) => {
  return axios.post("devices", {
     "name": Device.brand,
     "model": Device.modelName,
     "version": Device.platformApiLevel,
     "app_version": DeviceInfo.getVersion(),
     "unique_id": DeviceInfo.getUniqueId(),
   })
    .then((res) => {
      navigation.navigate("WebViewScreen", data);
    }).catch((err) => {
      console.log(err)
      const messages = err.response.data.message;
      let alertMessage = "";
      if (typeof messages == "object") {
        for (const key in messages) {
          alertMessage += messages[key][0] + "\n\r";
        }
      } else {
        alertMessage = messages;
      }
      Alert.alert("Device Not Added", alertMessage, [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("LoginScreen");
          },
        },
      ]);
    });
};

/**
 * @param device_id [Required]
 * @param timezone [Required]
 * @param limit
 */
export const getQueues = (device_id, timezone, limit=0) => {
  const query = {
    device_unique_id:device_id,
    timezone:timezone,
  };
  if (limit) {
    Object.assign({limit:limit},query)
  }
  return axios.get("queues",{params:query}).then(res => res.data);
};

/**
 * @param device_id [Required]
 * @param queue_id [Required]
 * @param status [Required]
 * @param error_code
 */
export const updateQueue = (device_id, queue_id, status,error_code) => {
  error_code=error_code || null;
  return axios.post("queue/update/status", { device_id, queue_id, status,error_code }).then(res => res.data);
};


export const getSendingSettings = () => {
  return axios.get("/sending/setting").then(res => res.data);
};

export const storeInbound = (obj) => {
  return axios.post("/inbound", obj).then(res => res.data);
};
