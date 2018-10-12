---
title: "Automatic deployment Let's Encrypt Certificate"
date: 2016-06-01 16:16:52
tags: Encrypt
---

### Install in Ubuntu14
```
> sudo apt-get update
> sudo apt-get install git
> sudo easy_install --upgrade pip
> sudo apt-get install python-dev
> sudo apt-get install dialog
> sudo pip install libffi-dev
> sudo pip install cryptography
> sudo pip install zope.component
> sudo pip install pyrfc3339
> sudo pip install werkzeug
> sudo pip install --upgrade requests
> sudo pip install letsencrypt
> sudo pip install letsencrypt-nginx
> sudo apt-get install letsencrypt
> sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
> ./letsencrypt-auto --apache -d www.example.com

```
### Add to Crontab
```
> sudo crontab -e
30 2 * * 1 /opt/letsencrypt/letsencrypt-auto renew >> /var/log/le-renew.log
```

#### From
```
https://certbot.eff.org/
https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts
```