---
title: Proxychains for MAC OSX 10.11.4
date: 2016-04-14 10:35:56
tags: Proxychains
---


```
➜  ~ brew install curl
➜  ~ brew install proxychains-ng
➜  ~ vi /usr/local/etc/proxychains.conf    # edit proxychains.conf
```

```
socks5  127.0.0.1    1080
```


```
➜  ~ proxychains4 /usr/local/Cellar/curl/7.47.1/bin/curl http://httpbin.org/ip
[proxychains] config file found: /usr/local/Cellar/proxychains-ng/4.11/etc/proxychains.conf
[proxychains] preloading /usr/local/Cellar/proxychains-ng/4.11/lib/libproxychains4.dylib
[proxychains] DLL init: proxychains-ng 4.11
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  httpbin.org:80  ...  OK
{
  "origin": "xxx.xxx.xxx.xxx"
}
```
