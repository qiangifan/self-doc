### 基于 cordova 框架打包 androidAPP + vue + vue-cli 3.0

#### 步骤一 安装 JAVA 环境

> 1. 在 JAVA 官网 https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html 下载 JAVA 8.0 版本
> 2. 安装 JAVA，直接安装就行
> 3. 配置环境变量按自己安装的路径添加（java:JAVA_HOME;C:\Program Files\Java\jdk1.8.0_181）
> 4. 再把你的 java 环境变量名字添加到 path 中去%JAVA_HOME%\bin ####步骤二 安装 node 环境
> 5. 在 node 官方https://nodejs.org/dist/latest-v8.x/ 下载 zip 包
> 6. 解压你下载好的 node 压缩包 按照路径添加到 path 环境变量 C:\Program Files\nodejs\
>    ####步骤三 安装 android SDK
> 7. 在 android SDK 官网 http://www.androiddevtools.cn/下载 下载 SDK Tools 24.4.1 版本 Windows android_r24.4.1 的 zip
> 8. 解压 android 压缩包之后 打开 SDK Manager.exe 运行，会出来一个弹窗
> 9. 勾选那个环境请看 https://blog.csdn.net/tong_11/article/details/80324451
> 10. android 安装完毕之后添加环境变量 ANDROID_HOME D:\Android\android-sdk-windows 按照自己安装的路径去写，然后在填入 path 中%ANDROID_HOME%\tools; ####步骤四 node 安装 cordova 框架
> 11. 命令行输入：npm install -g cordova（有可能会很慢，请把 npm 的镜像指到淘宝镜像）

#### 步骤五 创建我们的第一个项目

> 1. 命令行输入：cordova creat cordovaApp com.cordova testapp (创建 cordova 项目，cordova create 项目名 com.公司名 类名）项目创建完毕
> 2. cd 到你所创建的目录当中去
> 3. 输入命令行：cordova platform add android（添加安卓平台）

#### 步骤六 修改 vue 项目

#####修改 vue.config.js

> 1. 进入 vue 项目，找到 vue.config.js
> 2. 添加如下代码

```
module.exports = {
  baseUrl: '', //用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  outputDir: '../www', //输出文件夹，我这里设为www,主要是和Cordova配合生成安卓应用的。
  productionSourceMap:false,//不生成map
  runtimeCompiler: true // 包含运行时编译器的 Vue 构建版本
}
```

> 3. outputDir 在 webpack 中相当于出口生成到 www 文件中去是完全为了 cordova 框架应用 #####修改 main.js
> 1. 在 vue 项目中找到 src 文件夹中的 main.js
> 1. 在最后一个 import 下添加如下代码

```
if (window.location.protocol === 'file:' || window.location.port === '3000') {
    var cordovaScript = document.createElement('script');
     cordovaScript.setAttribute('type', 'text/javascript');
     cordovaScript.setAttribute('src', 'cordova.js');
     document.body.appendChild(cordovaScript);
 }
```

#### 步骤七 ‘复制？？’

> 1. 把修改好的 vue 项目放到刚刚创建好的 cordova 项目的根目录中去

#### 步骤八 vue 项目打包

> 1. cd 到 cordova 项目的 vue 项目中去
> 2. 运行命令： npm run build (打包)
> 3. 打包之后我们会看到 cordova 项目中的 www 文件就是 vue 打包好的文件

#### 步骤九 运行 cordova 的 android 平台

> 1. 输入命令行：cordova run android（开启安卓所有的 API）

#### 步骤十 运行 cordova 的 android 打包

> 1. 输入命令行：cordova build android
> 2. 打包完毕之后会在 platforms 的 app 的 build 的 outputs 的 apk 的 debug 文件下出现你打包好的 apk ####坑点：
> 3. cordova build android 的时候 gradle 会不存在，手动下载 gradle 包 地址 https://services.gradle.org/distributions/ 下载 gradle-4.10.3-bin 版本压缩包
>    完毕后添加到 path 环境变量 C:\Users\bright_tong\AppData\gradle-4.10.3\bin
> 4. cordova build android 的时候会提示 CordovaLib 不存在，安装安卓的时候吧 8.0.0 版本中的第 6 个勾选起来安装

#### 步骤十一 打包签名 https://segmentfault.com/a/1190000013755356

> 1. 在项目根目录下运行命令 cordova build --release android,会在 testApp\platforms\android\build\outputs\apk 目录下生成一个 android-release-unsigned.apk
> 2. 运行命令 keytool -genkeypair -alias name.keystore -keyalg RSA -validity 4000 -keystore name.keystore
>    执行以上命令后，会要求填写密码口令，单位信息等等，这里需要记住录入的密码，因为最后编译 apk 的时候还需要用到，在所有的选项都录入完后，按回车，会在项目的根目录下生成一个 name.keystore 的签名文件，里面就包含刚刚录入的一些信息。
>    会在根目录下生成一个 name.keystore,这是 apk 独有的签名证书,如下图(命令中的 name.keystore 中的 name 是签名文件的名字，这里可以任意取名，我习惯用 name.keystore)
> 3. 将 platforms\android\build\outputs\apk 目录下生成一个 app-release-unsigned.apk，并将它和根目录下的 name.keystore 放在同一目录下
> 4. 进入这个文件夹下，运行命令 jarsigner -verbose -keystore name.keystore -signedjar name.apk app-release-unsigned.apk name.keystore,输入之前签名的录入的密码，经过编译，会生成最后的签名版本 name.apk

#### 步骤十二 发布

> 1. name.apk
