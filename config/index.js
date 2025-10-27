// 配置文件
const Config = {
  dev: {
    BaseUrl: "http://192.168.20.181:8009",
    // BaseUrl: "http://192.168.28.200:8003",
    ContextPath: "/zhgt-server",
    FilePath: "",
  }, // 本地服务
  stag: {
    BaseUrl: "https://kindliu.cn",
    ContextPath: "/zhgt-server",
    FilePath: "/assets/zhgt",
  }, // 测试服务
  pro: {
    BaseUrl: "https://zhgt.mujunkj.cn",
    ContextPath: "/zhgt-server",
    FilePath: "/assets",
  }, // 正式服务
};

/**
 * pro 正式版
 * stag 测试服务
 * dev 本地服务
 * 重要: 禁止连正式版库测试
 */
const env = "pro";

export default Config[env];
