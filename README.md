# 小小聊天室

先看截图：

![](https://s2.ax1x.com/2020/01/31/13r2lR.jpg)

体验地址：

[react开发版本](http://xchat.curtaintan.club/)

[dva开发版本(旧版本)](http://xchat.curtaintan.club/dva/)

## 项目介绍
---

- **完成功能：**

1. 选择用户头像
2. 发送图片
2. 支持发送emoji
3. 消息换行
2. 创建房间
2. 删除房间
3. 私聊
4. 申请加入房间
5. 失去连接删除群聊
6. 兼容手机端
7. 未读消息提示

- **再次重构想要添加的功能：**

1. 支持修改个人信息
2. 支持修改主题颜色搭配
3. 支持语音读消息
4. 支持图箱功能

## 开发说明：

- **服务端说明**

1. 使用koa+socket.io开发
2. 使用单例模式管理状态
3. 使用函数柯理化处理传参
4. 自写简单单元测试

- **客户端说明**

react版本说明：

1. 使用creact-react-app构建
2. 使用immutable.js搭配redux管理状态
3. 使用redux-saga
4. 使用react-loadable懒加载、预加载组件和路由
5. 使用emoji-mart发送emoji
6. 路由鉴权
7. 404页面
8. 使用hooks组件

dva版本说明：

使用dva一套，没有使用immutable.js，在redux里面进行鉴权

## 后记：

我会把一些技术的文章和遇到的难题记录在我的博客里：

预计会写的文章：

1. 思路清晰--socke.io使用
2. 思路清晰--redux与redux-saga执行流程
3. dva使用技巧小结
4. 思路清晰--写一个深拷贝
5. 思路清晰--细数js的浅拷贝

### **我的博客：[点击直达](http://blog.curtaintan.club/)**

## 好了，很高兴你能体验我的作品，希望你能喜欢

# 共勉
