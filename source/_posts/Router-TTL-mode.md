---
title: Router TTL mode
date: 2017-01-04 22:28:54
tags: Router
---

[Download](http://www.prolific.com.tw/UserFiles/files/PL2303_MacOSX_1_6_1_20160309.zip) PL2303 Devices
```
> brew install minicom
> ls /dev/tty.*     //find tty.usbserial

/dev/tty.-WirelessiAP            /dev/tty.-WirelessiAP-1          /dev/tty.Bluetooth-Incoming-Port /dev/tty.smilentMacBookPro-Bluet /dev/tty.usbserial-UUT
> sudo minicom -s
```
1). Select "Serial port setup"

```
+-----------------------------------------------------------------------+
| A -    Serial Device      : /dev/tty.usbserial-UUT                    |
| B - Lockfile Location     : /usr/local/Cellar/minicom/2.7/var         |
| C -   Callin Program      :                                           |
| D -  Callout Program      :                                           |
| E -    Bps/Par/Bits       : 115200 8N1                                |
| F - Hardware Flow Control : No                                        |
| G - Software Flow Control : No                                        |
|                                                                       |
|    Change which setting?                                              |
+-----------------------------------------------------------------------+
```
2). Save setup as dfl

3). Exit

4)
```
> sudo minicom -s
```
