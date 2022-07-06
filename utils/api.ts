import axios from "axios";

import { getData, setData } from "./storage";

import { storage } from "../constants/Server";

axios.interceptors.request.use(async (request) => {
  const server = await getData(storage.server);
  const token = await getData(storage.token);
  request.headers["Content-Type"] = "application/json";
  request.headers["accept"] = "application/json";

  if (token && server) {
    request.baseURL = server + "/api/";
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
}, error => {
  console.log(error.response.status);
  return Promise.reject(error);
});

export interface DeviceInfo {
  "name": string;
  "model": string;
  "app_version": string;
  "android_version": string;
  "device_unique_id": string;
}

export const addDevice = (info: DeviceInfo) => {
  return axios.post("add/device", info).then(res => res.data);
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
