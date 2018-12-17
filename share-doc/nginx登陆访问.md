## nginx 权限访问配置

### nginx.conf 配置

```
server {
  listen 8088;
  root /data/web;
  location / {
    auth_basic "closed site";
    auth_basic_user_file /data/conf/htpasswd;
    autoindex on;
  }
}
```

### 密码文件配置

- 1. 创建一个 htpasswd 文件,无后缀名
- 2. 文件写入用户名密码 语法:用户名:密码
- 3. 在在线 htpasswd 生成器中生成密码,将密码添加到文件中
- 4. 重置 nginx 服务

### 密码文件添加用户密码

- 1. 安装 httpd -- yum install httpd
- 2. 添加用户和密码语法 htpasswd -b[cmBdpsDv][-c cost] passwordfile username password
- 3. 例子: htpasswd -b /data/conf/pwd liudehua 111111

### 批量添加脚本

```
#!/bin/bash

PASSFILE=/data/conf/htpasswd

[ ! -f $PASSFILE ] && touch $PASSFILE

echo 'input username and password'

while read username password

echo 'continue input username and password'

do
    sudo htpasswd -b -d $PASSFILE $username $password
done

```

### 文档链接

- 在线 htpasswd 生成器 http://tool.oschina.net/htpasswd
- nginx 用户认证配置 ngx_http_auth_basic_module 模块
  > https://blog.csdn.net/github_34457546/article/details/78547744
 > https://www.cnblogs.com/snifferhu/p/6148900.html
 > https://blog.csdn.net/a_bang/article/details/72630578
