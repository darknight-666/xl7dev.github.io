---
title: Respberry pi as time capsule
date: 2016-10-22 11:04:39
tags: Respberry
---

### 0x01 lists
```
respberry pi 2B
My Passport Ultra 2T hfs+
```
### 0x02 install 
```

pi@raspberrypi:~ $ sudo apt-get install hfsplus hfsutils hfsprogs
pi@raspberrypi:~ $ sudo apt-get install git git-core –y
pi@raspberrypi:~ $ sudo git clone git://git.drogon.net/wiringPi
pi@raspberrypi:~ $ cd wiringPi && sudo ./build
pi@raspberrypi:~ $ gpio –g read 38
0
pi@raspberrypi:~ $ gpio -g write 38 1
1
pi@raspberrypi:~ $ gpio -g read 38
1
pi@raspberrypi:~ $ sudo blkid
/dev/mmcblk0p1: SEC_TYPE="msdos" LABEL="boot" UUID="86EA-017B" TYPE="vfat" PARTUUID="ea0e7380-01"
/dev/mmcblk0p2: UUID="ad6203a1-ec50-4f44-a1c0-e6c3dd4c9202" TYPE="ext4" PARTUUID="ea0e7380-02"
/dev/sda1: UUID="a10e864b-92bd-39ac-ae75-cf5a26ee8107" LABEL="My Passport" TYPE="hfsplus" PARTUUID="28d26e49-01"
/dev/mmcblk0: PTUUID="ea0e7380" PTTYPE="dos"
pi@raspberrypi:~ $ sudo /sbin/parted
GNU Parted 3.2
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
proc            /proc           proc    defaults          0       0
(parted) print
Model: WD My Passport 0837 (scsi)
Disk /dev/sda: 2000GB
proc            /proc           proc    defaults          0       0
Sector size (logical/physical): 512B/512B
proc            /proc           proc    defaults          0       0
Partition Table: msdos
Disk Flags:

Number  Start   End     Size    Type     File system  Flags
 1      1049kB  2000GB  2000GB  primary  hfs+         boot
 ```
 ```
pi@raspberrypi:~ $ sudo mkdir -p /media/TimeCapsule
pi@raspberrypi:~ $ sudo vim /etc/fstab
# line to add to fstab
/dev/sda1       /media/TimeCapsule   hfsplus force,rw,user,auto  0   0
pi@raspberrypi:~ $ sudo mount -t hfsplus -o force /dev/sda1 /media/TimeCapsule
pi@raspberrypi:~ $ sudo chown -R pi:pi /media/TimeCapsule
pi@raspberrypi:~ $ sudo apt-get install netatalk
pi@raspberrypi:~ $ sudo vi /etc/netatalk/AppleVolumes.default
#~/			"Home Directory"
/media/TimeCapsule "Time Capsule" options:tm
```
```
pi@raspberrypi:~ $ sudo service netatalk restart
pi@raspberrypi:~ $ sudo apt-get install avahi-daemon libnss-mdns
pi@raspberrypi:~ $ sudo vi /etc/nsswitch.conf
hosts:      files mdns4_minimal [NOTFOUND=return] dns

to

hosts:      files mdns4_minimal [NOTFOUND=return] dns mdns4  mdns
```
```
pi@raspberrypi:~ $ sudo vi /etc/avahi/services/afpd.service
<?xml version="1.0" standalone='no'?><!--*-nxml-*-->
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
    <name replace-wildcards="yes">%h</name>
    <service>
        <type>_afpovertcp._tcp</type>
        <port>548</port>
    </service>
    <service>
        <type>_device-info._tcp</type>
        <port>0</port>
        <txt-record>model=TimeCapsule</txt-record>
    </service>
</service-group>
```
```
pi@raspberrypi:~ $ sudo vi /usr/local/etc/afp.conf
[Global]
  mimic model = TimeCapsule6,106

[Time Machine 2TB]
  path = /media/TimeCapsule
  time machine = yes
```
```
pi@raspberrypi:~ $ sudo service avahi-daemon start
pi@raspberrypi:~ $ sudo service netatalk start
pi@raspberrypi:~ $ sudo update-rc.d avahi-daemon defaults
pi@raspberrypi:~ $ sudo update-rc.d netatalk defaults
pi@raspberrypi:~ $ sudo apt-get install hdparm
pi@raspberrypi:~ $ sudo vi /etc/hdparm.conf
command_line {
  hdparm -S 240 /dev/sda
}
pi@raspberrypi:~ $ sudo reboot
```