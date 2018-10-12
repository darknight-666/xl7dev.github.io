---
title: Android allowBackup tips
date: 2017-06-23 17:54:49
tags:
---

Android allowBackup tips

### root device
#### 0x01 backup
```
> adb backup com.example.sharedprefs -f com.example.sharedprefs.ab
```
#### 0x02 unpack
```
> java -jar abe.jar unpack com.example.sharedprefs.ab com.example.sharedprefs.tar
```
#### 0x03 tar2ab
```
> java -jar abe.jar pack com.example.sharedprefs.tar com.example.sharedprefs.ab
```
#### 0x04 restore
```
> adb restore back com.example.sharedprefs.ab
```
[Download abe.jar](http://jaist.dl.sourceforge.net/project/adbextractor/abe.jar)
### not root device
```
> adb backup -f com.example.sharedprefs.ab com.example.sharedprefs
> binwalk com.example.sharedprefs.ab
> dd if=com.example.sharedprefs.ab bs=24 skip=1| openssl zlib -d > com.example.sharedprefs.tar
> tar -tf com.example.sharedprefs.tar > com.example.sharedprefs.list
> tar -xf com.example.sharedprefs.tar
> cd apps/com.example.sharedprefs/sp/
> star -c -v -f newbackup.tar -no-dirslash list=com.example.sharedprefs.list
> dd if=com.example.sharedprefs.ab bs=24 count=1 of=newbackup.ab
> openssl zlib -in newbackup.tar >> newbackup.ab
> adb restore newbackup.ab
```
