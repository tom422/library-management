// 进行axios二次封装：使用请求与响应拦截器
import axios, { AxiosRequestConfig } from "axios";
// 使用了element的消息提示插件
import { ElMessage } from "element-plus";
// 第一步：利用axios对象的create方法，创建axios实例(其他配置：基础路径、超时的时间等)
const request = axios.create({
  // 基础路径
  baseURL: "/api", // 基础路径上携带/api
});
// 第二步：request实例添加请求与响应拦截器:一个回调方法
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  return config;
});
// 第三步：响应拦截器:有两个回调方法，一个成功一个失败
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    return response.data;
  },
  (error) => {
    // 失败回调：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let message = "";
    // http状态码
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    // 利用element提供的组件提示错误信息
    ElMessage({
      type: "error",
      message,
    });
    // 返回失败的Promise对象终结Promise
    return Promise.reject(error);
  }
);

// 第四步：对外暴露

/*导出封装的请求方法*/
import { Result } from "../utils/types"
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> {
    return request.get(url, config);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return request.post(url, data, config);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return request.put(url, data, config);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> {
    return request.delete(url, config);
  },
};
