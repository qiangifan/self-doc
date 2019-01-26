## 通过页面唤醒APP

>1 判断当前操作系统。

>2 如果是windows直接跳转到下载页面。

>3 当判断时移动端浏览器时，通过URL Schema唤醒本地APP。

>4 设定一个延迟，在规定的时间阈值内如果没有打开本地APP，认为本地没有安装APP，跳转到相应的下载地址下载。

>5 在微信中唤醒APP时，不需要设置延迟阈值及本地唤醒，安卓直接跳转到腾讯应用宝相应APP界面。如果本地已经安装，腾讯应用宝启动APP，如未安装，腾讯应用宝显示下载。IOS同理跳转到App store。

>6 暂未找到支付宝生活号APP内唤醒第三方APP的文档。

```html
  <button style="color: red; background-color: '#999'; " onClick=open_or_download_app()>打开App</button>
  <div id='userAgent'></div>
  <div id='isHave'></div>
```


```javascript
    // 唤醒APP
    open_or_download_app() {
      console.log('app', navigator.userAgent);
       document.getElementById('userAgent').innerText = navigator.userAgent;
       document.getElementById('isHave').innerText = Boolean(
         navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) ||
           navigator.userAgent.match(/android/i)
       );

      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        // 判断useragent，当前设备为ios设备
         document.getElementById('isHave').innerText = '正在跳转。。。';
        const loadDateTime = new Date(); // 设置时间阈值，在规定时间里面没有打开对应App的话，直接去App store进行下载。
        window.setTimeout(function() {
          const timeOutDateTime = new Date();
           if (timeOutDateTime - loadDateTime < 6000) {
          window.location = 'https://itunes.apple.com/cn/app/id1323927569'; // 唯一不可修改
           } else {
                window.close();
           }
        }, 3000);
        window.location = 'IOSParkingShare://'; // IOS端URL Schema
      } else if (navigator.userAgent.match(/android/i)) {
        // 判断useragent，当前设备为ios设备
         document.getElementById('isHave').innerText = '正在跳转。。。';
        window.setTimeout(function() {
          const timeOutDateTime = new Date();

           if (timeOutDateTime - loadDateTime < 6000) {
          window.location = 'http://app.qq.com/#id=detail&appid=1106610680'; // APP下载地址
           } else {
               window.close();
           }
        }, 3000);

        window.location = 'hbwtkj://com.xzapp'; // Android端URL Schema
      }
        else { // PC端
               window.location = "http://www.xiaozhuanggx.com/download.html";
        }
    }
```

## android端的相关配置

> 1 主要技术

  目前使用到的是用户自定义的 URI Scheme（Custom URI scheme） 打开 app
  
  就Android平台而言，URI主要分三个部分：scheme, authority and path。其中authority又分为host和port。格式如下： scheme://host:port/path ，
 
```html

  <a href='app://myapp?a=12&b=7'>打开App</a>
  

```
   
  **注：** uri要用UTF-8编码和URI编码

  举个实际的例子： 

    content://com.example.project:200/folder/subfolder/etc ？arg0=1&arg1=2

    \-----/  \------------------/ \--/ \-----------------/ \-------------/(query我们要传的值)
     scheme          host         port     path (我们要传的值如果是传多个值使用&)

             \-----------------------/ authority

> 2 功能实现配置

使用Android Studio 打开项目的原生代码部分，等待编译加载；

点开 app\manifests\AndroidManifest.xml文件；

在该文件中 寻找到application标签下含有intent-filter标签的activity标签，在该标签中，新建一个intent-filter标签，内容如下所示：

```xml

   <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustPan">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
		<!--下面所设置的为网页打开app的配置主体-->
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <!--下面所设置的需要和html端一致-->
            <!--在data里设置了 scheme和host，则该Activity可以接收和处理类似于 "sharetest://data/XXX"的链接-->
            <data
                android:scheme="app" android:host="myapp"/>
        </intent-filter>

    </activity>

```

> 3 获取参数


获取参数，网上的文档，多仅限于在原生代码中获取再进行下一步的操作，对于js部分如何获取，还没有实践过。

原生代码是在MainActivity文件的onCreate方法中实现的，主要使用到了以下方法：

getIntent().getScheme(); //获得Scheme名称 

getIntent().getDataString(); //获得Uri全部路径 

getIntent().getHost(); //获得host

getIntent().getPath(); //获得Path

getIntent().getPort(); //获得Port

getIntent().getQueryParameter("a"); // 获取到传参中的a值

getIntent().getQuery(); // 获取到query，？后边的传参集合字符串

> 4  参看文档

   小桩停车app目前实现的配置
   
   Android--通过网页打开APP并传值详解：https://blog.csdn.net/huohao_blogs/article/details/72461107
   
   Android应用安全开发之浅谈网页打开APP：https://blog.csdn.net/alimobilesecurity/article/details/51209990
   
## IOS端的相关配置

该部分还需要进一步补充完善