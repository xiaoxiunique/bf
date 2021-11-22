import { boot } from 'quasar/wrappers'
import axios from 'axios'
import qs from "qs";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:7001/api/v1' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$request

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$request (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'bearer ' + localStorage.getItem('token');
    if (config.method === 'GET') {
      //请求头转换为表单形式
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      config.transformRequest = [function (data) {
        // 在请求之前对data传参进行格式转换
        data = qs.stringify(data);
        return data;
      }];
    }
    return config;
  });


  api.interceptors.response.use(function (resp) {
    return resp && resp.data;
  }, function (error) {
    return error;
  });
})

export { api }
