---
title: Android Debug Enable Tips
date: 2016-09-19 03:39:29
tags: Android Debug
---

### 0x01 AndroidManifest.xml debuggable

```
> apktool d example.apk -o example
```
> AndroidManifest.xml add android:debuggable="true"

```
<application android:allowBackup="true" android:debuggable="true" android:icon="@drawable/header" android:label="@string/app_name" android:name="com.example" android:supportsRtl="true" android:theme="@style/AppBaseTheme">
```
```
> apktool b example -o new_example.apk
> jarsigner -keystore debug.keystore -storepass android -keypass android new_example.apk androiddebugkey
```


### 0x02 boot.img

```
1.从Google官方网站下载到boot.img
2.使用工具（abootimg，gunzip, cpio）把boot.img完全解开，获取到default.prop
3.修改default.prop
4.把修改后的文件重新打包成boot_new.img
5.使用fastboot工具把boot_new.img刷入设备（fastboot flash boot boot_new.img）
```
### 0x03 mprop
> [mprop](https://blog.safebuff.com/upload/mprop)

```
> ps |grep zygote|awk '{print $2}'|xargs kill -9
> mprop ro.debuggable 1
> getprop ro.debuggable
```
### 0x04 Xposed hook system debug (Install Xinstaller Plugin)

```
1. 通过Xposed安装Xinstaller
2. ☑️专家模式
3. 其它设置>>调试应用
4. 重启手机
```