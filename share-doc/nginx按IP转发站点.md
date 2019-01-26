## 摘要

> 前端通过 nginx 转发解决跨域问题,在一台公共服务器做转发.
> 但每个开发人员 IDE 启动后 ip 服务地址不同,所以需要服务转发的地址按各自 ip 进行转发.

---

### nginx 配置

```
server {
    listen 80;
    server_name web.test.com;

    # $remote_addr访问ip
    # 同一个局域网内
    location / {
       proxy_pass http://$remote_addr:8080;
    }

    # 访问api时的请求转发配置
    location /api/ {
       rewrite  ^.+api/?(.*)$ /$1 break;
       include  uwsgi_params;
       proxy_pass https://后端目标站点地址/;
   }

}

```

---

### 修改 hosts 文件

> 每个开发人员修改自己的 host 文件,将 web.test.com 对应的服务器 ip 添加到 host 文件中
