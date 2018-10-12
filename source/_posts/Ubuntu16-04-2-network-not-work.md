---
title: Ubuntu16.04.2 network not work
date: 2017-05-02 11:52:38
tags: ubuntu
---

### Create a new template
```
右上角网络连接>>编辑连接>>增加>>
以太网 >> 1) 填写连接名称：ethernet
          2) 选择设备
802.1X安全性 >> 
	1) 勾选对此连接使用802.1X安全配置
	2) 认证选择受保护的EAP(PEAP)
	3) 勾选不需要CA证书(R)
	4) 内部认证>>MSCHAPv2
	5) 输入帐号和密码
IPv4 >> 勾选需要IPv4地址完成这个连接
```
### setting 
> sudo cat /etc/NetworkManager/system-connections/ethernet

```
[connection]
id=ethernet
uuid=9e123fbc-0123-46e3-97b5-f3214e123456
type=ethernet
interface-name=eno1
permissions=
secondaries=

[ethernet]
duplex=full
mac-address=0A:12:3C:DA:C1:A5
mac-address-blacklist=

[802-1x]
altsubject-matches=
eap=peap;
identity=username   # replace you login username
password=password   # replace you login password
phase2-altsubject-matches=
phase2-auth=mschapv2
system-ca-certs=true

[ipv4]
dns-search=
may-fail=false
method=auto

[ipv6]
addr-gen-mode=stable=privacy
dns-search=
ip6-privacy=0
method=auto
```
