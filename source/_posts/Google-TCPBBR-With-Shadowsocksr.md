---
title: Google TCPBBR With Shadowsocksr
date: 2017-06-21 17:17:32
tags: Shadowsocksr
---

#### Google TCPBBR
CentOS 6+，Debian 7+，Ubuntu 12+

```
> wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.11/linux-headers-4.11.0-041100_4.11.0-041100.201705041534_all.deb
> dpkg -i linux-image-4.*.deb
> update-grub
> reboot
> modprobe tcp_bbr
> echo "tcp_bbr" >> /etc/modules-load.d/modules.conf
> echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
> echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
> sysctl -p
> sysctl net.ipv4.tcp_available_congestion_control
> sysctl net.ipv4.tcp_congestion_control
```
or quick install via bash script
```
> wget -N --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && bash bbr.sh
> uname -r  # if have 4.9.0 success install
> sysctl net.ipv4.tcp_available_congestion_control
> sysctl net.ipv4.tcp_congestion_control
> sysctl net.core.default_qdisc
> lsmod | grep bbr    # have bbr success install
```
#### Server
```
> apt-get install git
> git clone https://github.com/shadowsocksr/shadowsocksr
```
Debian / Ubuntu:
```
> apt-get install git
> git clone https://github.com/shadowsocksr/shadowsocksr.git
```
CentOS:
```
> yum install git
> git clone https://github.com/shadowsocksr/shadowsocksr.git
```
Windows:
```
> git clone https://github.com/shadowsocksr/shadowsocksr.git
```
```
> cd shadowsocksr && bash initcfg.sh
> cd ~/shadowsocksr/shadowsocks
> python server.py -p 443 -k password -m aes-128-cfb -O auth_chain_a -o tls1.2_ticket_auth -d start
```
#### Client

Android APP: [SSR-android](https://github.com/shadowsocksr/shadowsocksr-android/releases)

iOS APP： [Shadowrocket](https://itunes.apple.com/us/app/shadowrocket/id932747118), [Potatso2](https://itunes.apple.com/app/id1162704202?mt=8)

MAC APP：[ShadowsocksX-NG-R8](https://github.com/shadowsocksr/ShadowsocksX-NG/releases)

其它跨平台分支：[avege](https://github.com/avege/avege), [electron-ssr](https://github.com/erguotou520/electron-ssr)

#### Speed Setting
```
> vi /etc/security/limits.conf  # add line to file
*   soft    nofile  512000
*   hard    nofile  1024000
> vi /etc/profile   # add line to file
ulimit -SHn 1024000
> reboot
> ulimit -n     # if return 1024000 success
> vi /etc/sysctl.conf
# turn on TCP Fast Open on both client and server side
net.ipv4.tcp_fastopen = 3
> vi /etc/shadowsocks.json  # edit false to true
"fast_open": true
> apt-get install python-m2crypto
> pip install M2Crypto --upgrade
> apt-get install python-dev libevent-dev python-setuptools python-gevent
easy_install greenlet gevent
```

Docker: https://hub.docker.com/r/breakwa11/shadowsocksr/