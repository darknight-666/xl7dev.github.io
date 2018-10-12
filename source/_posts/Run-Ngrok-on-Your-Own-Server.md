---
title: Run Ngrok on Your Own Server
date: 2016-03-15 22:10:17
tags: ngrok
---

### 0x01 环境：
	
```
ubuntu12.04
go1.4       #安装目录：/usr/local/go/
ngrok1.7    #安装目录：/root/ngrok/
```

### 0x02 安装应用程序

```
> sudo apt-get update
> sudo apt-get install build-essential golang mercurial
> git clone https://github.com/inconshreveable/ngrok.git && cd ngrok
```
<!--more-->
### 0x03 生成证书

以下域名替换成自己的
```
> openssl genrsa -out base.key 2048
> openssl req -new -x509 -nodes -key base.key -days 10000 -subj "/CN=tunnel.youdomain.com" -out base.pem
> openssl genrsa -out server.key 2048
> openssl req -new -key server.key -subj "/CN=tunnel.youdomain.com" -out server.csr
> openssl x509 -req -in server.csr -CA base.pem -CAkey base.key -CAcreateserial -days 10000 -out server.crt
```


    base.key
    base.pem
    base.srl
    server.crt
    server.csr
    server.key


### 0x04 配置域名

设置域名解析子域名设置如下：解析子域名
```
＊.turnnel	ip		A	3600
```



### 0x05 配置


```
> cd /root/ngrok/
> cp base.pem assets/client/tls/ngrokroot.crt￼
> make release-server release-client
> chmod +x ngrokd
> chmod +x ngrok
```

Running Ngrok Server

```
> ./ngrokd -tlsKey=server.key -tlsCrt=server.crt -domain="tunnel.youdomain.com" -httpAddr=":8080" -httpsAddr=":8081"
```

Running Ngrok Client
> 新建一个ngrok.cfg添加如下内容：

```
server_addr: tunnel.youdomain.com:4443
trust_host_root_certs: false	＃确保你的 TLS 连接安全
tunnels:
	http:
        subdomain: "example"
        auth: "username:password"
        proto:
            http: "80"
	ssh:
        proto:
			tcp: "22"
```

```
> ./ngrok start http ssh tunnel.youdomain.com	#即可快速启动这三个隧道服务
> nohup ./ngrok -config=ngrok.yml -log stdout -log-level="INFO" -proto=tcp 80 # 后台运行 
> ./ngrok -subdomain blog -config=ngrok.cfg -proto=tcp 22 	#命令行直接配置
￼
```
### 0x06 客户端生成

树莓派是基于arm架构的系统,编译一份arm的ngrok文件
- 编译生成树莓派arm客户端
	
```
>cd /usr/local/go/src/
>GOOS=linux GOARCH=arm CGO_ENABLED=0 ./make.bash
>cd /root/ngrok
>GOOS=linux GOARCH=arm make release-client
```


- 编译生成windows客户端
	
```
>cd /usr/local/go/src/
>GOOS=windows GOARCH=amd64 CGO_ENABLED=0 ./make.bash  
>cd  /root/ngrok/
>GOOS=windows GOARCH=amd64 make release-client
```
编译后，就会在bin目录下生成windows_amd64目录，其中就包含着windows下运行的客户端程序

- 编译生成osx客户端
	
```
> cd /usr/local/go/src
> GOOS=darwin GOARCH=amd64 ./make.bash
> cd /root/ngrok/
> GOOS=darwin GOARCH=amd64 make release-client
```
编译后，就会在bin/darwin_amd64/目录下生成osx下运行的客户端程序

关于编译对应环境配置

$GOOS | $GOARCH
---|---
darwin | 386
darwin | amd64
darwin | arm
darwin | arm64
dragonfly | amd64
freebsd	| 386
freebsd	| amd64
freebsd	| arm
linux | 386
linux | amd64
linux | arm
linux | arm64
linux | ppc64
linux | ppc64le
netbsd | 386
netbsd | amd64
netbsd | arm
openbsd | 386
openbsd | amd64
openbsd | arm
plan9 | 386
plan9 | amd64
solaris | amd64
windows | 386
windows | amd64
### 0x07 设置开机自动启动ngrok服务
复制如下启动命令保存为ngrok_start文件并且存放在／etc/init.d/目录下。
	

    /root/ngrok/bin/ngrokd -tlsKey=/root/ngrok/server.key -tlsCrt=/root/ngrok/server.crt -domain="tunnel.youdomain.com" -httpAddr=":80" -httpsAddr=":443"

```
> sudo chmod 755 /etc/init.d/ngrok_start
> cd /etc/init.d && sudo update-rc.d ngrok_start defaults 20  #将上述脚本放到启动脚本里
> cd /etc/init.d && sudo update-rc.d -f ngrok_start remove    #卸载启动脚本方法
```

