import React from "react";

import Icon from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import { navigationRef } from "../navigation/ref";
import { removeData } from "../utils/storage";
import { storage } from "../constants/Server";

const WebViewRight = () => {
  const exitToLogin = () => {
    removeData(storage.server,storage.token,storage.queued).catch(()=>{console.log("unable to delete storage")})
    navigationRef.navigate("LoginScreen");
  };
  return (
    <TouchableOpacity onPress={exitToLogin}>
      <Icon name="exit-outline" size={30} color="#FF4961" />
    </TouchableOpacity>
  );
};

export default WebViewRight;