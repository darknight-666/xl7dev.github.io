---
title: Raspberry pi as Download with Aria
date: 2016-10-24 16:56:57
tags: raspberry
---

```
pi@raspberrypi:~ $ sudo apt-get install aria2
pi@raspberrypi:~ $ git clone https://github.com/ziahamza/webui-aria2
pi@raspberrypi:~ $ sudo mkdir /etc/aria2
pi@raspberrypi:~ $ sudo touch /etc/aria2/aria2.session
pi@raspberrypi:~ $ sudo touch /etc/aria2/aria2.conf
pi@raspberrypi:~ $ sudo chmod 666 /etc/aria2/aria2.session
pi@raspberrypi:~ $ sudo chmod 666  /etc/aria2/aria2.conf
pi@raspberrypi:~ $ sudo vi /etc/aria2/aria2.conf
```
```
continue=true
daemon=true
dir=/media/你的外接硬盘名称/downloads
enable-rpc=true
file-allocation=none
force-sequential=true
input-file=/etc/aria2/aria2.session
log=/var/logaria2.log
log-level=notice
max-concurrent-downloads=3
max-connection-per-server=5
parameterized-uri=true
rpc-allow-origin-all=true
rpc-listen-all=true
rpc-save-upload-metadata=true
save-session=/etc/aria2/aria2.session
save-session-interval=60
split=5
```
```
pi@raspberrypi:~ $ sudo aria2c --conf-path= /etc/aria2/aria2.conf -D
pi@raspberrypi:~ $ sudo echo "/usr/bin/aria2c --conf-path=/etc/aria2/aria2.conf" >> /etc/rc.local

```