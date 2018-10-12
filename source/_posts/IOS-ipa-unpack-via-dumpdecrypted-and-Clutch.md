---
title: IOS ipa unpack via dumpdecrypted and Clutch
date: 2016-10-09 16:10:05
tags: IOS
---

### 0x01 Install dumpdecrypted Clutch ifunbox
```
> git clone https://github.com/stefanesser/dumpdecrypted && cd dumpdecrypted && make && ls
Makefile            dumpdecrypted.c     dumpdecrypted.o
README              dumpdecrypted.dylib
```
download [Cluth](https://github.com/KJCracks/Clutch/releases)
```
> scp Cluth root@10.0.250.10:/usr/bin/Clutch
```
Via [ifunbox](http://www.i-funbox.com/en_download.html) backup ipa

### 0x02 dumpdecrypted unpack
```
iPhone5S:~ ps -e | grep var
iPhone5S:~ cycript -p pid
# [[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask][0]
#"file:///var/mobile/Applications/B2497E64-F422-4C0F-A3B3-C6129E18E362/Documents"
> scp dumpdecrypted.dylib root@10.0.250.10:/var/mobile/Applications/F2842AA9-F
082-4EA1-8FAD-97BBAAA84D8F/Documents/dumpdecrypted.dylib
iPhone5S:~ /var/mobile/Applications/F2842AA9-F
082-4EA1-8FAD-97BBAAA84D8F/Documents/ root# DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib /var/mobile/Applications/B2497E64-F422-4C0F-A3B3-C6129E18E362/M1IPhone.app/M1IPhone
```
```
objc[64669]: Class LocalAccount is implemented in both /System/Library/PrivateFrameworks/Message.framework/Message and /var/mobile/Applications/B2497E64-F422-4C0F-A3B3-C6129E18E362/M1IPhone.app/M1IPhone. One of the two will be used. Which one is undefined.
mach-o decryption dumper

DISCLAIMER: This tool is only meant for security research purposes, not for application crackers.

[+] detected 64bit ARM binary in memory.
[+] offset to cryptid found: @0x100014c08(from 0x100014000) = c08
[+] Found encrypted data at address 00004000 of length 8798208 bytes - type 1.
[+] Opening /private/var/mobile/Applications/B2497E64-F422-4C0F-A3B3-C6129E18E362/M1IPhone.app/M1IPhone for reading.
[+] Reading header
[+] Detecting header type
[+] Executable is a FAT image - searching for right architecture
[+] Correct arch is at offset 10600448 in the file
[+] Opening M1IPhone.decrypted for writing.
[+] Copying the not encrypted start of the file
[+] Dumping the decrypted data into the file
[+] Copying the not encrypted remainder of the file
[+] Setting the LC_ENCRYPTION_INFO->cryptid to 0 at offset a1cc08
[+] Closing original file
[+] Closing dump file
```
```
iPhone5S:/var/mobile/Applications/B2497E64-F422-4C0F-A3B3-C6129E18E362/Documents root# ls
```
```
File/                       httpCache/                                       syssetting.sqlite-shm
M1IPhone.decrypted          seeyondb.db                                      syssetting.sqlite-wal
MobileWebsite.plist         serverID864d0587fe654e5298adf39cc1c3ad19.sqlite
dumpdecrypted.dylib*  syssetting.sqlite
```
```
> scp root@10.0.250.19:/var/root/M1Iphone.decrypted ./
> class-dump -H M1Iphone.decrypted -o head
```
```
ABNewPersonViewControllerDelegate-Protocol.h                      SyGetMEdocListRequest.h
ABPeoplePickerNavigationControllerDelegate-Protocol.h             SyGetMEdocListResponse.h
AJOKeyPath.h                                                      SyGetMFeedbackListBiz.h
AMCArrayMutableProtocol-Protocol.h                                SyGetMFeedbackListBizParam.h
AMCArrayProtocol-Protocol.h                                       SyGetMFeedbackListRequest.h
AMCHashMutableProtocol-Protocol.h                                 SyGetMFeedbackListResponse.h
AMCHashProtocol-Protocol.h                                        SyGetMMeetingCountRequest.h
```
### 0x03 Clutch unpack

```
iPhone5S:~ root# Clutch -i

Installed apps:
1:   Uber <com.ubercab.UberClient>
2:   QQ <com.tencent.mqq>
3:   微信 <com.tencent.xin>

iPhone5S:~ root# Clutch -d 1

Zipping UberClient.app
Swapping architectures..
ASLR slide: 0x8f000
Dumping <UberClient> (armv7)
Patched cryptid (32bit segment)
Writing new checksum
ASLR slide: 0x1000fc000
Dumping <XueBa> (arm64)
Patched cryptid (64bit segment)
Writing new checksum
DONE: /private/var/mobile/Documents/Dumped/com.UberClient-iOS7.0-(Clutch-2.0.4).ipa
Finished dumping com.wenba.bangbang in 19.6 seconds

iPhone5S:~ root# class-dump -H /Applications/UberClient.app -o /var/root/dump/UberClient-dump
```
### 0x04 weak_classdump unpack
**download** [weak_classdump](https://github.com/limneos/weak_classdump)
```
iPhone5S:~ root# cycript -p Skype weak_classdump.cy; cycript -p Skype

'Added weak_classdump to "Skype" (1685)'

#cy weak_classdump_bundle([NSBundle mainBundle],"/tmp/MobilePhone")
```


