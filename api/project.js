 import request from "~/utils/fetch"

 const prefix = "/s/project";

 export const search = (params) => {
   return request(`${prefix}/search`, 'GET', params);
 }

 export const user_all = (params) => {
   return request(`${prefix}/user-all`, 'GET', params);
 }

 export const info = (params) => {
   return request(`${prefix}/info`, 'GET', params);
 }