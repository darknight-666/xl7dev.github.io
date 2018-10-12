---
title: GSM Hacking With SMS Sniffer for Kali2
date: 2016-03-17 13:09:07
tags: GSM Sniffer kali2
---


```
> vim /etc/apt/sources.list
> deb http://mirrors.ustc.edu.cn/kali kali main non-free contrib
> deb-src http://mirrors.ustc.edu.cn/kali kali main non-free contrib
> deb http://mirrors.ustc.edu.cn/kali-security kali/updates main contrib non-free
> apt-get update
> aptitude install libtool shtool autoconf git-core pkg-config make gcc
> apt-get install build-essential libgmp3-dev libmpfr-dev libx11-6 libx11-dev texinfo flex bison libncurses5 libncurses5-dbg libncurses5-dev libncursesw5 libncursesw5-dbg  libncursesw5-dev zlibc zlib1g-dev libmpfr4 libmpc-dev libtalloc-dev synaptic
> mkdir osmocombb && cd osmocombb
> wget -c http://bb.osmocom.org/trac/raw-attachment/wiki/GnuArmToolchain/gnu-arm-build.3.sh
> chmod +x gnu-arm-build.3.sh
> mkdir build install src
> cd src/
> wget http://ftp.gnu.org/gnu/gcc/gcc-4.8.2/gcc-4.8.2.tar.bz2
> wget http://ftp.gnu.org/gnu/binutils/binutils-2.21.1a.tar.bz2
> wget ftp://sources.redhat.com/pub/newlib/newlib-1.19.0.tar.gz
> cd /root/osmocombb && ./gnu-arm-build.3.sh
> export PATH=$PATH:/root/osmocombb/install/bin
> git clone git://git.osmocom.org/libosmocore.git && cd libosmocore
> autoreconf -i
> ./configure
> make && sudo make install
> cd .. && sudo ldconfig
> git clone git://git.osmocom.org/osmocom-bb.git
> cd /root/osmocombb/osmocom-bb && git checkout --track origin/luca/gsmmap
> cd src 
> make
> cd ~/osmocombb/osmocom-bb/src/host/osmocon/ && ./osmocon -m c123xor -p /dev/ttyUSB0 ../../target/firmware/board/compal_e88/layer1.compalram.bin    #此时需要按一下手机的红色关机键，等待手机出现Osmocom-bb系统
```
<!--more-->
重新再打开一个终端窗口运行如下命令

```
> cd /root/osmcombb/osmocom-bb/src/host/layer23/src/misc
> ./cell_log -O
```

```
root@kali:~/osmcombb/osmocom-bb/src/host/layer23/src/misc# ./cell_log -O
Copyright (C) 2010 Andreas Eversberg

License GPLv2+: GNU GPL version 2 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Failed to connect to '/tmp/osmocom_sap'.
Failed during sap_open(), no SIM reader
<000e> cell_log.c:864 Scanner initialized
Mobile initialized, please start phone now!
<000e> cell_log.c:443 Measure from 0 to 124
<000e> cell_log.c:443 Measure from 512 to 885
<000e> cell_log.c:443 Measure from 955 to 1023
<000e> cell_log.c:434 Measurement done
Cell ID: 460_0_107B_AA84
<000e> cell_log.c:248 Cell: ARFCN=29 PWR=-47dB MCC=460 MNC=00 (China, China Mobile)
```

```
> ./ccch_scan -i 127.0.0.1 -a 29 # 注意这里的117就是上面的ARFCN后面的编号
```


```
> sudo wireshark -k -i lo -f 'port 4729'
```






Q1 firmware写入失败

```
make[1]: *** [board/compal_e88/hello_world.compalram.elf] error 1
make[1]: Leaving directory `/root/osmocom-bb/src/target/firmware’
make: *** [firmware] error 2
```

解决办法：
```
> git clean -dfx && make
```
Q2 ARFCN值出不来的问题
解决办法：
    在osmocom-bb目录下修改如下文件
```
src/target/firmware/board/compal/highram.lds
src/target/firmware/board/compal/ram.lds
src/target/firmware/board/compal_e88/flash.lds
src/target/firmware/board/compal_e88/loader.lds
src/target/firmware/board/mediatek/ram.lds
```

找到每个文件中的 

```
KEEP(*(SORT(.ctors)))   ＃在其下面添加KEEP(*(SORT(.init_array)))
```

```
LONG(SIZEOF(.ctors) / 4 - 2)
/* ctor pointers */
KEEP(*(SORT(.ctors)))
KEEP(*(SORT(.init_array)))
/* end of list */
LONG(0)
```
然后重新编译即可
