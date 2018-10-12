---
title: Raspberry Pi Tips
date: 2016-03-12 17:27:02
tags: RaspberryPi
---

###  0x01 环境
- 	MAC 10.11
- 	raspberrypi 2b+
- 	Sands 32G  Fat32格式
- 	Raspbian GNU/Linux 8

### 0x02 下载系统
    
```
> wget http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2015-11-24/2015-11-21-raspbian-jessie.zip
> unzip 2015-11-21-raspbian-jessie.zip
```

    
### 0x03 查看挂载的卷
	
```
> df -h	#默认情况下是/dev/disk2
> diskutil unmountDisk /dev/disk2	＃如果出错重启电脑再次允许命令
```

### 0x04 写入系统
	
```
> sudo dd bs=4m if=2015-11-21-raspbian-jessie.img of=/dev/rdisk2    ＃if output error dd: /dev/rdisk2: Resource busy,then restart system

938+0 records in
938+0 records out
3934257152 bytes transferred in 183.262297 secs (21467903 bytes/sec)
```

<!--more-->
### 0x05 远程连接ssh

```
> ssh pi@<IP>			#default password is raspberry
> sudo passwd root 		#setting root password
> sudo passwd - -unlock root	# start root username
> reboot
```

### 0x06 配置raspberry
	
第一次用root登录，会自动弹出树莓派的高级设置面板，选择第一项Expand Filesystem



```
> vi /etc/apt/sources.list  # add links to file
```

```
http://mirrors.ustc.edu.cn/raspbian/raspbian/
```

### 0x07 使用剩余内存卡容量
	
```
> sudo raspi-config		＃选择第一项Expand Filesystem
```
￼
命令解释：
1. 查看当前磁盘大小，总大小只有2.9GB
1. 查看第二分区的起始地址，后面会用到
1. 使用fdisk操作磁盘
1. d，删除分区
1. 2，删除第二分区
1. 创建一个新分区
1. 创建主分区
1. 分区2
1. 输入第一次得到的第二分区起始扇区
1. 最后一个sector，默认即可
1. 将上面的操作写入分区表
1. 设置完成需要重启，sudo reboot重启完成，使用df -h查看发现空间并没有增大，还需要输入resize2fs /dev/mmcblk0p2

### 0x08 配置无线网卡自动连接
	
```
>sudo vi /etc/wpa_supplicant/wpa_supplicant.conf    # add code to file
```

```
network={
	ssid="wifi name"
	psk="wifi password"
	key_mgmt=WPA-PSK
}
```


### 0x09 移除已安装程序
	
```
>sudo apt-get –purge remove APPNAME
```

### 0x10 安装vnc
	
```
>sudo apt-get install tightvncserver
>cd /home/pi && cd .config
>mkdir autostart && cd autostart
>vi tightvnc.desktop

```
添加如下代码：

```
[Desktop Entry]
Type=Application
Name=TightVNC
Exec=vncserver :1
StartupNotify=false
```
vncserver :1 -geometry 1280x800 -depth 24

### 0x11 HDMI高清显示问题
在SD卡中修改config.ini文件：加入以下代码
	
```
hdmi_safe=1
overscan_left=-30
overscan_right=-30
overscan_top=-30
overscan_bottom=-30
hdmi_group=2
hdmi_mode=4
hdmi_drive=2
config_hdmi_boost=4

```

### 0x12 Install Metasploit
	
```
> sudo apt-get update && sudo apt-get dist-upgrade && sudo apt-get install build-essential libreadline-dev libssl-dev libpq5 libpq-dev libreadline5 libsqlite3-dev libpcap-dev openjdk-7-jre git-core autoconf postgresql pgadmin3 curl zlib1g-dev libxml2-dev libxslt1-dev vncviewer libyaml-dev
> cd ~ && git clone git://github.com/sstephenson/rbenv.git .rbenv
> echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc && echo 'eval "$(rbenv init -)"' >> ~/.bashrc && exec $SHELL 
> git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build && echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc && exec $SHELL
> rbenv install 2.1.7 && rbenv global 2.1.7 && ruby -v 
> sudo apt-get install nmap
> sudo -s
> su postgres
> createuser -P -S msf -R -D
> createdb -O msf msf
> exit
> cd /opt
> git clone https://github.com/rapid7/metasploit-framework.git && chown -R `whoami` /opt/metasploit-framework
> cd metasploit-framework
> gem install bundler && bundle install 
> bash -c 'for MSF in $(ls msf*); do ln -s /opt/metasploit-framework/$MSF /usr/local/bin/$MSF;done' 
> sh -c "echo export MSF_DATABASE_CONFIG=/opt/metasploit-framework/config/database.yml >> /etc/profile"
> source /etc/profile
```

### 0x13 Install flash for pi 2

```	
> wget http://ftp.us.debian.org/debian/pool/main/libg/libgcrypt11/libgcrypt11_1.5.0-5+deb7u3_armhf.deb
> wget http://launchpadlibrarian.net/218525709/chromium-browser_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
> wget http://launchpadlibrarian.net/218525711/chromium-codecs-ffmpeg-extra_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
> sudo dpkg -i libgcrypt11_1.5.0-5+deb7u3_armhf.deb
> sudo dpkg -i chromium-codecs-ffmpeg-extra_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
> sudo dpkg -i chromium-browser_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
> wget http://odroidxu.leeharris.me.uk/PepperFlash-12.0.0.77-armv7h.tar.gz
> tar -xzf PepperFlash-12.0.0.77-armv7h.tar.gz
> cd PepperFlash
> chmod +x *
> sudo cp * /usr/lib/chromium-browser/plugins
> sudo vi  /etc/chromium-browser/default

CHROMIUM_FLAGS="--ppapi-flash-path=/usr/lib/chromium-browser/plugins/libpepflashplayer.so --ppapi-flash-version=12.0.0.77 -password-store=detect -user-data-dir"
```

### 0x14 Install beef

```
> git clone https://github.com/beefproject/beef.git
> sudo chmod -R 755 beef && cd beef
> sudo apt-get install libsqlite3-dev sqlite3 sqlite3-doc
> proxychains bundle update
```
