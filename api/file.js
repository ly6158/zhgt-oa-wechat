 import request from "~/utils/fetch"

 const prefix = "/s/file";

 export const search = (params) => {
   return request(`${prefix}/search`, 'GET', params);
 }