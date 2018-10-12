---
title: Android Dynamic Debug
date: 2016-09-08 12:31:04
tags: Android
---

### 0x01 Install Tools

1) smalidea
```
> wget https://bitbucket.org/JesusFreke/smali/downloads/smalidea-0.03.zip
```
2) IDEA install smalidea
```
Preferences >> Plugins >> Install plugin from disk
```
3) baksmali
```
> wget https://bitbucket.org/JesusFreke/smali/downloads/baksmali-2.1.3.jar -O baksmali.jar
```
### 0x02 Usage
**step 1**
```
> java -jar baksmali.jar app.apk -o app/src
```
**step 2**

导入到Android Studio

**step 3**

Run >> Edit configuration >> 选择+号 >> Remote  >> 修改Port:8700

**step 4**
```
> ~/Library/Android/sdk/tools/monitor
```
**step 5**

USB接入android手机，在monitor程序中的Devices会看到手机驱动在线，选择你要调试的android程序包名

**step 6**

在android studio中在想要下断点的smali代码中增加一个断点，然后按快捷键Control+D
