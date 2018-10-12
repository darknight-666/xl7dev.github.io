---
title: Openwrt install Tor Proxy
date: 2017-02-26 18:41:12
tags: Openwrt
---


```
> opkg update
> opkg install tor
```
root@OpenWrt:~# vi /etc/tor/torrc
```
RunAsDaemon 0  
DataDirectory /var/lib/tor  
User tor  
Socks5Proxy 127.0.0.1:1080
SocksPort 0.0.0.0:9050  
TransPort 0.0.0.0:9040  
DNSPort 0.0.0.0:53  
AvoidDiskWrites 1
```
root@OpenWrt:~# vi /etc/config/dhcp
```
config dnsmasq
       option noresolv '1'
       list server '127.0.0.1#53'
```
root@OpenWrt:~# /etc/init.d/tor stop
root@OpenWrt:~# tor
