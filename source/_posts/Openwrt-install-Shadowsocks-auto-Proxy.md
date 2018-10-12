---
title: Openwrt install Shadowsocks auto Proxy
date: 2017-02-26 12:37:56
tags: Openwrt
---

```
> opkg update
> opkg install ip ip-full iptables-mod-tproxy ipset libopenssl iptables-mod-tproxy
> wget https://github.com/aa65535/openwrt-chinadns/releases/download/v1.3.2-4/ChinaDNS_1.3.2-4_ar71xx.ipk
> wget https://github.com/aa65535/openwrt-dist-luci/releases/download/v1.6.0/luci-app-chinadns_1.6.0-1_all.ipk
> opkg install *.ipk
```

#### ChinaDNS
Services >> ChinaDNS

header 1 | header 2
---|---
Enable | ☑️
Enable Bidirectional Filter | ☑️ help Also filter results inside China from foreign DNS servers
Local Port  |   5353
CHNRoute File   |   /etc/chinadns_chnroute.txt
Upstream Servers    |   180.76.76.76,8.8.4.4

root@OpenWrt:~# crontab -e

```
0 0 * * * wget -O- 'http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest' | awk -F\| '/CN\|ipv4/ { printf("%s/%d\n", $4, 32-log($5)/log(2)) }' > /etc/chinadns_chnroute.txt
```
#### Shadowsocks
**Services >> ShadowSocks >> General Settings >> Transparent Proxy**


header 1 | header 2
---|---
Main Server | [Shadowsocks server IP:Port]
UDP-Relay Server | Same as Main Server
Local Port  |   1234

**Services >> ShadowSocks >> SOCKS5 Proxy**

header 1 | header 2
---|---
Server | [Shadowsocks Server IP:Server Port]
Local Port | 1080

**Services >> ShadowSocks >> Servers Manage >> Edit**

header 1 | header 2
---|---
Server | [Shadowsocks IP]
Server Port | [Shadowsocks Port]
Connection Timeout | 60
Password | password
Encrypt Method | AES-256-CFB
Plugin Name |   
Plugin Arguments |  