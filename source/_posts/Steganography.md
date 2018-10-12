---
title: Steganography
date: 2016-09-03 22:27:07
tags: Steganography
---

### copy
```
> copy /b 1.jpg+1.rar new.jpg
```

### binwalk
```
> binwalk zip.jpg
```

### [Stegsolve](http://www.caesum.com/handbook/Stegsolve.jar)
```
Stegsolve.jar
```

### exiftool
```
> exiftool 1.jpg
```

### [MP3Stego](http://www.petitcolas.net/fabien/software/MP3Stego_1_1_18.zip)
```
> encode -E hidden_text.txt -P pass svega.wav svega_stego.mp3
> decode -X -P pass svega_stego.mp3
```

### dd
```
> binwalk carter.jpg
```
```
  
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             JPEG image data, JFIF standard 1.01
382           0x17E           Copyright string: "Copyright (c) 1998 Hewlett-Packard Company"
3192          0xC78           TIFF image data, big-endian, offset of first image directory: 8
140147        0x22373         JPEG image data, JFIF standard 1.01
140177        0x22391         TIFF image data, big-endian, offset of first image directory: 8
```
```
> dd if=test.jpg of=test.jpg skip=140147 bs=1
```

### foremost
```
> foremost
```

### ffmpeg
> mp4

```
ffmpeg 1.mp4
```
### pngcheck
```
> pngcheck -vv 1.png
```
### zlib
>python来写zlib解压,zlib开头是以78 9C开头

```
#! /usr/bin/env python
import zlib
import binascii
IDAT = "789C5D91011280400802BF04FFFF5C75294B5537738A21A27D1E49CFD17DB3937A92E7E603880A6D485100901FB0410153350DE83112EA2D51C54CE2E585B15A2FC78E8872F51C6FC1881882F93D372DEF78E665B0C36C529622A0A45588138833A170A2071DDCD18219DB8C0D465D8B6989719645ED9C11C36AE3ABDAEFCFC0ACF023E77C17C7897667".decode('hex')
#print IDAT
result = binascii.hexlify(zlib.decompress(IDAT))
print result
 
#print result.decode('hex')
```