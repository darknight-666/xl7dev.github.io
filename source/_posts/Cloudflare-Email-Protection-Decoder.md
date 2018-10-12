---
title: Cloudflare Email Protection Decoder
date: 2016-06-01 16:06:05
tags: Cloudflare
---


### Encode Code
```
<a id="__cf_email__" href="http://cloudflare.com/email-protection.html" class="f091809582839f9eb080999e97848582849c95de939f9d">[email protected]</a>
<script type="text/javascript">
/* <!--[CDATA[ */
(function() {
    try {
        var s, a, i, j, r, c, l = document.getElementById("__cf_email__");
        a = l.className;
        if (a) {
            s = '';
            r = parseInt(a.substr(0, 2), 16);
            for (j = 2; a.length - j; j += 2) {
                c = parseInt(a.substr(j, 2), 16) ^ r;
                s += String.fromCharCode(c);
            }
            s = document.createTextNode(s);
            l.parentNode.replaceChild(s, l);
        }
    } catch(e) {}
})();
/* ]]--> */
</script>
```
<!--more-->
### PHP Decode Code
```
<?php
echo 'Decoded Email: '.deCFEmail('314554424571455442451f525e5c');
 
function deCFEmail($c){
   $k = hexdec(substr($c,0,2));
   for($i=2,$m='';$i<strlen($c)-1;$i+=2)$m.=chr(hexdec(substr($c,$i,2))^$k);
   return $m;
}
?>
```
### Python Decode Code
```
#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 xl7dev <xl7dev@xl7dev.local>
#
# Distributed under terms of the MIT license.

"""

"""
import re
def deCFEmail():
    fp = '314554424571455442451f525e5c'
    r = int(fp[:2],16)
    email = ''.join([chr(int(fp[i:i+2], 16) ^ r) for i in range(2, len(fp), 2)])
    print email
if __name__ == "__main__":
    deCFEmail()
```
> output

```
test@test.com
```
### example wooyun

```
#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 xl7dev <xl7dev@xl7dev.local>
#
# Distributed under terms of the MIT license.

"""

"""
import requests
import re
import os
import smtplib
from multiprocessing.dummy import Pool as ThreadPool

def strip_email_protection(num):
    emails = []
    output = open('wooyun_emails.txt', 'a')
    url = 'http://zone.wooyun.org/content/%s' % str(num)
    cookies = {''} # add youself wooyun cookies
    s = requests.get(url,cookies=cookies).content
    fps = re.findall('data-cfemail="([^"]+)">', s)
    for fp in fps:
        r = int(fp[:2], 16)
        email = ''.join([chr(int(fp[i:i+2], 16) ^ r) for i in range(2, len(fp), 2)])
        match = ''.join(re.findall('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}', email))
        if verify(match, 'root@safebuff.com'):
            print '%s exists.' %  match
            emails.append(match)
            output.write(match)
            output.write('\n')
        else:
            print '%s DOES NOT exist.' % match
    output.close()
    return emails
def verify(addr, local_addr='root@safebuff.com'):
    """Verify the existance of a single email address."""
    MX = re.compile(r'^.*\s+mail exchanger = (?P<priority>\d+) (?P<host>\S+)\s*$')
  # Find mail exchanger of this address.
    host = addr.rsplit('@', 2)[1]
    p = os.popen('nslookup -q=mx %s' % host, 'r')
    mxes = list()
    for line in p:
        m = MX.match(line)
        if m is not None:
            mxes.append(m.group('host'))
    if len(mxes) == 0:
        return False
    else:
        host = mxes[0]
  # Connect to the mail server and check.
    try:
        server = smtplib.SMTP(host, timeout=20)
        server.ehlo_or_helo_if_needed()
        code, response = server.docmd('mail from:', 'root@safebuff.com')
        code, response = server.docmd('rcpt to:', addr)
        server.quit()
        return (code // 100 == 2)
    except Exception:
        pass
if __name__ == '__main__':
    pool = ThreadPool(20)
    nums = [x for x in range(1,25550)]
    #import ipdb; ipdb.set_trace()
    results = pool.map(strip_email_protection, nums)
    pool.close()
    pool.join()
    print results
```