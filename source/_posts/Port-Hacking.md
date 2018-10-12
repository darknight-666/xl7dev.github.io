---
title: Port Hacking
date: 2016-05-15 22:59:16
tags: Port
---


<!--more-->
```
Port    information
21      ftp  主要看是否支持匿名，也可以跑弱口令
22      ssh
23      telnet
79      Finger
80      web  常见web漏洞以及是否为一些管理后台
111     rpcinfo
161     snmp
389     LDAP
443     openssl  心脏滴血以及一些web漏洞测试
445     SMB
512     Rexec
513     Rexec
514     Rexec
873     rsync  未授权，主要看是否支持匿名，也可以跑弱口令
1025    nfs
1099    rmi协议
1433    mssql
1521    oracle
1900    bes默认管理后台
2082    cpanel主机管理系统登陆 （国外用较多）
2083    cpanel主机管理系统登陆 （国外用较多）
2100    Oracle XDB FTP服务
2181    zookeeper 未配置权限
2182    zookeeper 未配置权限
2222    DA虚拟主机管理系统登陆 （国外用较多） 
2375    docker  未授权访问,Web页面访问http://host:2375/containers/json   >docker -H tcp://host:2375 ps
2601    zebra路由，默认密码zebra
2604    zebra路由，默认密码zebra
3000    Webrick(Ruby Webserver)
3128    squid代理默认端口，如果没设置口令很可能就直接漫游内网了
3306    mysql
3311    kangle主机管理系统登陆 初始用户密码admin/kangle
3312    kangle主机管理系统登陆
3690    svn http://wooyun.org/bugs/wooyun-2015-0141925
3389    mstsc远程桌面
4440    rundeck  参考WooYun: 借用新浪某服务成功漫游新浪内网
4848    GlassFish web中间件 弱口令:admin/adminadmin
5432    postgresql
5900    VNC
5984    CouchDB数据库未授权访问漏洞 http://host:5984/_utils/
6082    varnish  参考WooYun: Varnish HTTP accelerator CLI 未授权访问易导致网站被直接篡改或者作为代理进入内网
6379    redis 一般无认证，可直接访问
6082    varnish
7001    Weblogic
7002    Weblogic
7474    Neo4j
7778    Kloxo主机控制面板登录 
8000-9090  Web端口
8000    海康威视    admin/12345
8089    jboss端口 历史曾经爆漏洞/可弱口令
8098    Riak8080    tomcat
8080    tomcat默认tomcat/tomcat WDCP主机管理系统admin/wdlinux.cn root/wdlinux.cn
8083    Vestacp主机管理系统 （国外用较多
8888    amh/LuManager 主机管理系统默认端口
8983    solr
9000    Hbase
9000    fcgi fcig php执行 资料:http://zone.wooyun.org/content/1060
9043    websphere[web中间件] 弱口令: admin/admin websphere/ websphere ststem/manager
9080    WebSphere应用程序
9090    WebSphere管理工具
9090    多个厂商上网行为管理设备命令执行及getshell http://wooyun.org/bugs/wooyun-2016-0192732
9200    elasticsearch   remote code execution
9300    elasticsearch   remote code execution
10000   Virtualmin/Webmin 服务器虚拟主机管理系统
10068   :10068/resin-doc/examples/jndi-appconfig/test?inputFile=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd    http://www.wooyun.org/bugs/wooyun-2015-098504
11211   memcache 未授权访问
27017   mongodb 未授权访问
28017   mongodb统计页面
20880   dubbo未授权访问
50000   SAP命令执行
50060   hadoop web案例:WooYun: 爱拍某处产品日志泄漏
50070   hadoop默认端口未授权访问
53413   Netcore(Netis)路由器UDP后门 msf> exploits/linux/misc/netcore_udp_53413_backdoor
```