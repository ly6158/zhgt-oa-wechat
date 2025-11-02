 import request from "~/utils/fetch"

 const prefix = "/s/sign";

 export const search = (params) => {
   return request(`${prefix}/search`, 'GET', params);
 }

 export const user_all = (params) => {
  return request(`${prefix}/user-all`, 'GET', params);
}

 export const user_search = (params) => {
  return request(`${prefix}/user-search`, 'GET', params);
}

 export const info = (params) => {
   return request(`${prefix}/info`, 'GET', params);
 }

 export const add = (data) =>{
  return request(`${prefix}/add`, 'POST', data);
 }
