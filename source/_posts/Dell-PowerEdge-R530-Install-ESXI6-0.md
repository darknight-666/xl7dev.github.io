---
title: Dell PowerEdge R530 Install ESXI6.0
date: 2016-12-01 10:17:49
tags:
---

### 0x01 Download [ESXI6.0](http://www.dell.com/support/home/us/en/19/Drivers/DriversDetails?driverId=HJFY8)
zip
```
wget http://downloads.dell.com/FOLDER02873638M/1/VMware-ESXi-6.0.0-2494585.x86_64-Dell_Customized-Offlinebundle-A00.zip
```
iso
```
wget http://downloads.dell.com/FOLDER02873624M/1/VMware-VMvisor-Installer-6.0.0-2494585.x86_64-Dell_Customized-A00.iso
```

issue What to do if the installation still fails with Fatal Error 6:
```
Change from BIOS boot mode to UEFI boot mode
Install using the iDRAC virtual console / virtual media
```