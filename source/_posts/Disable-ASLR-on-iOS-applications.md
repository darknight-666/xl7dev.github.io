---
title: Disable ASLR on iOS applications
date: 2016-10-11 17:42:01
tags: iOS
---


```
iPhone5S:~ root# cd /var/mobile/Applications/<UUID>/ApplicationBinary.app/
iPhone5S:~ root# ~/removePIE ApplicationBinary

M1IPhone (architecture armv7):
Mach header
      magic cputype cpusubtype  caps    filetype ncmds sizeofcmds      flags
   MH_MAGIC     ARM         V7  0x00     EXECUTE    57       5788   NOUNDEFS DYLDLINK TWOLEVEL WEAK_DEFINES BINDS_TO_WEAK PIE
M1IPhone (architecture arm64):
Mach header
      magic cputype cpusubtype  caps    filetype ncmds sizeofcmds      flags
MH_MAGIC_64   ARM64        ALL  0x00     EXECUTE    57       6408   NOUNDEFS DYLDLINK TWOLEVEL WEAK_DEFINES BINDS_TO_WEAK PIE
```