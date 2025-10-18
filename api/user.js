 import request from "~/utils/fetch"

 const prefix = "/s/user";

 export const login = (params) => {
   return request(`${prefix}/app-login`, 'POST', params);
 }

 export const phone = (code, params) => {
   return request(`${prefix}/phone/${code}`, 'GET', params);
 }

 export const getCurrentInfo = (params) => {
   return request(`${prefix}/getCurrentInfo`, 'GET', params);
 }