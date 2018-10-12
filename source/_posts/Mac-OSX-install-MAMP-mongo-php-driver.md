---
title: Mac OSX install MAMP mongo-php-driver
date: 2017-02-25 22:15:23
tags: 
---

```
> brew install openssl autoconf
> echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc
> sudo /Applications/MAMP/bin/php/php5.6.10/bin/pecl install mongodb
```
open MAMP Pro > File > Edit Template > PHP > php5.6.10.ini
```
MAMP_apc_MAMP
extension=imap.so
extension=gettext.so
extension=mcrypt.so
extension=yaz.so
extension=pgsql.so
extension=pdo_pgsql.so
extension=mongodb.so
```
open http://127.0.0.1/phpinfo.php grep mongodb

**Q1**
```
running: phpize
grep: /Applications/MAMP/bin/php/php5.6.10/include/php/main/php.h: No such file or directory
grep: /Applications/MAMP/bin/php/php5.6.10/include/php/Zend/zend_modules.h: No such file or directory
grep: /Applications/MAMP/bin/php/php5.6.10/include/php/Zend/zend_extensions.h: No such file or directory
```
**fix**
```
sudo ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/include/ /Applications/MAMP/bin/php/php5.6.10/include
```

**Q2**
```
private/tmp/pear/install/mongodb/src/libbson/src/bson/ -DHAVE_CONFIG_H -g -O2 -D_THREAD_SAFE -pthread -c /private/tmp/pear/install/mongodb/src/libmongoc/src/mongoc/mongoc-crypto-openssl.c  -fno-common -DPIC -o src/libmongoc/src/mongoc/.libs/mongoc-crypto-openssl.o
/private/tmp/pear/install/mongodb/src/libmongoc/src/mongoc/mongoc-crypto-openssl.c:24:10: fatal error: 'openssl/sha.h' file not found
#include <openssl/sha.h>
         ^
1 error generated.
```
**fix**
```
> cd /usr/local/include 
> ln -s ../opt/openssl/include/openssl .
```