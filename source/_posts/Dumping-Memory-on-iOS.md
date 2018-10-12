---
title: Dumping Memory on iOS
date: 2016-12-28 13:02:59
tags: iOS
---

### 0x01 Tools
```
LLDB (http://lldb.llvm.org/)
Debugserver
Tcprelay.py ([https://github.com/xl7dev/SecTools/tree/master/iOSTool])
```
#### Setting Debugserver
```
1. via usb to connect mobile and MacOS
2. open xcode>>Window>>Devices
3. scp root@iOSIP:/Developer/usr/bin/debugserver ~/debugserver
4. lipo -thin arm64 ~/debugserver -output ~/debugserver

armv6设备： iPhone, iPhone2, iPhone3G, 第一代、第二代 iPod Touch

armv7设备：iPhone3GS iPhone4,iPhone4S iPad, iPad2, iPad3(The New iPad), iPad mini iPod Touch 3G, iPod Touch4

armv7s设备：iPhone5,iPhone5C, iPad4(iPad with Retina Display)

arm64设备：iPhone5S, iPad Air, iPad mini2(iPad mini with Retina Display)

5. wget http://7xibfi.com1.z0.glb.clouddn.com/uploads/default/668/c134605bb19a433f.xml -O ent.xml

6. ldid -Sent.xml debugserver
7. scp debugserver root@iOSIP:/usr/bin/debugserver
8. ssh root@iOSIP
9. chmod +x debugserver
```
### 0x02 Debugserver attack pid
```
> python tcprelay.py -t 22:2222 1234:1234
Forwarding local port 2222 to remote port 22
Forwarding local port 1234 to remote port 1234
Incoming connection to 2222
Waiting for devices...
Connecting to device <MuxDevice: ID 17 ProdID 0x12a8 Serial '0ea150b00ba3deeacb42f399492b7990416a0c87' Location 0x14120000>
Connection established, relaying data
Incoming connection to 1234
Waiting for devices...
Connecting to device <MuxDevice: ID 17 ProdID 0x12a8 Serial '0ea150b00ba3deeacb42f399492b7990416a0c87' Location 0x14120000>
Connection established, relaying data
> ssh root@127.0.0.1 -p 2222
IPhone5S:~ root# ./debugserver *:1234 -a appname
> lldb
(lldb) process connect connect://127.0.0.1:1234
(lldb) image dump sections appname

Sections for '/private/var/mobile/Containers/Bundle/Application/F3CFF345-71FC-47C4-B1FB-3DAC523C7627/appname.app/appname(0x0000000000047000)' (armv7):
 SectID     Type    Load Address   File Off     File Size   Flags      Section Name
 ------ ---------------- --------------------------------------- ---------- ---------- ---------- ----------------------------
 0x00000100 container   [0x0000000000000000-0x0000000000004000)* 0x00000000 0x00000000 0x00000000 appname.__PAGEZERO
 0x00000200 container   [0x0000000000047000-0x00000000001af000) 0x00000000 0x00168000 0x00000000 appname.__TEXT
 0x00000001 code    [0x000000000004e6e8-0x000000000016d794) 0x000076e8 0x0011f0ac 0x80000400 appname.__TEXT.__text
 0x00000002 code    [0x000000000016d794-0x000000000016e5e0) 0x00126794 0x00000e4c 0x80000400 appname.__TEXT.__stub_helper
 0x00000003 data-cstr   [0x000000000016e5e0-0x0000000000189067) 0x001275e0 0x0001aa87 0x00000002 appname.__TEXT.__cstring
 0x00000004 data-cstr   [0x0000000000189067-0x00000000001a5017) 0x00142067 0x0001bfb0 0x00000002 appname.__TEXT.__objc_methname
 0x00000005 data-cstr   [0x00000000001a5017-0x00000000001a767a) 0x0015e017 0x00002663 0x00000002 appname.__TEXT.__objc_classname
 0x00000006 data-cstr   [0x00000000001a767a-0x00000000001abe0c)
```
###0x03 dump memory
example:

```
0x00000003 data-cstr    [0x000000000016e5e0-0x0000000000189067) 0x001275e0 0x0001aa87 0x00000002 appname.__TEXT.__cstring
```
```
(lldb) memory read --outfile ~/0x00000003data-cstr 0x000000000016e5e0 0x0000000000189067 –force
```

ios7
```
https://blog.netspi.com/ios-tutorial-dumping-the-application-heap-from-memory
```