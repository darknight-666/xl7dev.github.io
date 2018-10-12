---
title: Port Scanner via Nmap && Masscan
date: 2017-03-09 18:59:28
tags: Nmap/Masscan
---

### Install to Mac
```
> brew install nmap
> brew install masscan
```
### Nmap Usage

**nmap -h**

```
Nmap 7.40 ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254
  -iL <inputfilename>: Input from list of hosts/networks
  -iR <num hosts>: Choose random targets
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
HOST DISCOVERY:
  -sL: List Scan - simply list targets to scan
  -sn: Ping Scan - disable port scan
  -Pn: Treat all hosts as online -- skip host discovery
  -PS/PA/PU/PY[portlist]: TCP SYN/ACK, UDP or SCTP discovery to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -PO[protocol list]: IP Protocol Ping
  -n/-R: Never do DNS resolution/Always resolve [default: sometimes]
  --dns-servers <serv1[,serv2],...>: Specify custom DNS servers
  --system-dns: Use OS's DNS resolver
  --traceroute: Trace hop path to each host
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  --scanflags <flags>: Customize TCP scan flags
  -sI <zombie host[:probeport]>: Idle scan
  -sY/sZ: SCTP INIT/COOKIE-ECHO scans
  -sO: IP protocol scan
  -b <FTP relay host>: FTP bounce scan
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080,S:9
  --exclude-ports <port ranges>: Exclude the specified ports from scanning
  -F: Fast mode - Scan fewer ports than the default scan
  -r: Scan ports consecutively - don't randomize
  --top-ports <number>: Scan <number> most common ports
  --port-ratio <ratio>: Scan ports more common than <ratio>
SERVICE/VERSION DETECTION:
  -sV: Probe open ports to determine service/version info
  --version-intensity <level>: Set from 0 (light) to 9 (try all probes)
  --version-light: Limit to most likely probes (intensity 2)
  --version-all: Try every single probe (intensity 9)
  --version-trace: Show detailed version scan activity (for debugging)
SCRIPT SCAN:
  -sC: equivalent to --script=default
  --script=<Lua scripts>: <Lua scripts> is a comma separated list of
           directories, script-files or script-categories
  --script-args=<n1=v1,[n2=v2,...]>: provide arguments to scripts
  --script-args-file=filename: provide NSE script args in a file
  --script-trace: Show all data sent and received
  --script-updatedb: Update the script database.
  --script-help=<Lua scripts>: Show help about scripts.
           <Lua scripts> is a comma-separated list of script-files or
           script-categories.
OS DETECTION:
  -O: Enable OS detection
  --osscan-limit: Limit OS detection to promising targets
  --osscan-guess: Guess OS more aggressively
TIMING AND PERFORMANCE:
  Options which take <time> are in seconds, or append 'ms' (milliseconds),
  's' (seconds), 'm' (minutes), or 'h' (hours) to the value (e.g. 30m).
  -T<0-5>: Set timing template (higher is faster)
  --min-hostgroup/max-hostgroup <size>: Parallel host scan group sizes
  --min-parallelism/max-parallelism <numprobes>: Probe parallelization
  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <time>: Specifies
      probe round trip time.
  --max-retries <tries>: Caps number of port scan probe retransmissions.
  --host-timeout <time>: Give up on target after this long
  --scan-delay/--max-scan-delay <time>: Adjust delay between probes
  --min-rate <number>: Send packets no slower than <number> per second
  --max-rate <number>: Send packets no faster than <number> per second
FIREWALL/IDS EVASION AND SPOOFING:
  -f; --mtu <val>: fragment packets (optionally w/given MTU)
  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys
  -S <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --proxies <url1,[url2],...>: Relay connections through HTTP/SOCKS4 proxies
  --data <hex string>: Append a custom payload to sent packets
  --data-string <string>: Append a custom ASCII string to sent packets
  --data-length <num>: Append random data to sent packets
  --ip-options <options>: Send packets with specified ip options
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address
  --badsum: Send packets with a bogus TCP/UDP/SCTP checksum
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt kIddi3,
     and Grepable format, respectively, to the given filename.
  -oA <basename>: Output in the three major formats at once
  -v: Increase verbosity level (use -vv or more for greater effect)
  -d: Increase debugging level (use -dd or more for greater effect)
  --reason: Display the reason a port is in a particular state
  --open: Only show open (or possibly open) ports
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML
  --webxml: Reference stylesheet from Nmap.Org for more portable XML
  --no-stylesheet: Prevent associating of XSL stylesheet w/XML output
MISC:
  -6: Enable IPv6 scanning
  -A: Enable OS detection, version detection, script scanning, and traceroute
  --datadir <dirname>: Specify custom Nmap data file location
  --send-eth/--send-ip: Send using raw ethernet frames or IP packets
  --privileged: Assume that the user is fully privileged
  --unprivileged: Assume the user lacks raw socket privileges
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  nmap -v -A scanme.nmap.org
  nmap -v -sn 192.168.0.0/16 10.0.0.0/8
  nmap -v -iR 10000 -Pn -p 80
SEE THE MAN PAGE (https://nmap.org/book/man.html) FOR MORE OPTIONS AND EXAMPLES
```
**NSE Categories**
```
auth
broadcast
brute
default
discovery
dos
exploit
external
fuzzer
intrusive
malware
safe
version
vuln
```

```
> sudo nmap -sS -Pn -n -v -sn -T5 -iL ips.txt
> sudo nmap -sS -Pn -n -v --open -p 80 -sV -T5 -O --host-timeout=180000 -iL ips.txt
> wget https://raw.githubusercontent.com/maaaaz/nmaptocsv/master/nmaptocsv.py
> python nmaptocsv.py -i test.nmap -f ip-fqdn-port-protocol-service-version-os
or
> python nmaptocsv.py -i test.gnmap -f ip-fqdn-port-protocol-service-version-os
```
```
192.168.1.2;test.lan;135;tcp;msrpc;Microsoft Windows RPC;Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
192.168.1.2;test.lan;139;tcp;netbios-ssn;;Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
192.168.1.2;test.lan;445;tcp;netbios-ssn;;Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
192.168.1.2;test.lan;5357;tcp;http;Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP);Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
```
**Import Metasploit**
> msfconsole

```
msf > db_import test.xml
msf > hosts
```

### Masscan Using
**masscan --nmap**

```
Usage: masscan [Options] -p{Target-Ports} {Target-IP-Ranges}
TARGET SPECIFICATION:
  Can pass only IPv4 address, CIDR networks, or ranges (non-nmap style)
  Ex: 10.0.0.0/8, 192.168.0.1, 10.0.0.1-10.0.0.254
  -iL <inputfilename>: Input from list of hosts/networks
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
  --randomize-hosts: Randomize order of hosts (default)
HOST DISCOVERY:
  -Pn: Treat all hosts as online (default)
  -n: Never do DNS resolution (default)
SCAN TECHNIQUES:
  -sS: TCP SYN (always on, default)
SERVICE/VERSION DETECTION:
  --banners: get the banners of the listening service if available. The
    default timeout for waiting to recieve data is 30 seconds.
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p 111,137,80,139,8080
TIMING AND PERFORMANCE:
  --max-rate <number>: Send packets no faster than <number> per second
  --connection-timeout <number>: time in seconds a TCP connection will
    timeout while waiting for banner data from a port.
FIREWALL/IDS EVASION AND SPOOFING:
  -S/--source-ip <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address
OUTPUT:
  --output-format <format>: Sets output to binary/list/json/grepable/xml
  --output-file <file>: Write scan results to file. If --output-format is
     not given default is xml
  -oL/-oJ/-oG/-oB/-oX <file>: Output scan in List/JSON/Grepable/Binary/XML format,
     respectively, to the given filename. Shortcut for
     --output-format <format> --output-file <file>
  -v: Increase verbosity level (use -vv or more for greater effect)
  -d: Increase debugging level (use -dd or more for greater effect)
  --open: Only show open (or possibly open) ports
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
MISC:
  --send-eth: Send using raw ethernet frames (default)
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  masscan -v -sS 192.168.0.0/16 10.0.0.0/8 -p 80
  masscan 23.0.0.0/0 -p80 --banners -output-format binary --output-filename internet.scan
  masscan --open --banners --readscan internet.scan -oG internet_scan.grepable
SEE (https://github.com/robertdavidgraham/masscan) FOR MORE HELP
```
**Other Setting**
```
--wait <int>: wait time
-oR <value>: setting redis connect 127.0.0.1:6379


```
```
> masscan 0.0.0.0/4 -p80 --rate 100000000 --router-mac 66-55-44-33-22-11
> masscan 10.1.2.3 -p80 --banners --rate 10000000 --repeat --source-address 192.168.1.0/8 --source-port 0-65535 --output-format null    # cc attack
```
**Differences in Log Formats**

|time | ip | port | state/status | ip_proto | reason | ttl | proto/service	| owner | sunrpc | version | banner | cert
---|---|---|---|---|---|---|---|---|---
binary|yes|yes|yes|yes|yes|yes|yes|yes|n/a|n/a|n/a|yes|yes
xml|no|yes|yes|yes|yes|yes|yes|yes|n/a|n/a|n/a|yes|yes
grepable|no|yes|yes|yes|yes|no|no|yes|n/a|n/a|n/a|yes|yes
json|no|yes|yes|yes|yes|yes|yes|yes|n/a|n/a|n/a|yes|yes
null|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a|n/a
redis|no|yes|yes|no|yes|no|no|no|n/a|n/a|n/a|no|no
text|yes|yes|yes|yes|yes|no|no|yes|n/a|n/a|n/a|yes|yes
unicornscan|no|yes|yes|yes|yes|no|yes|no|n/a|n/a|n/a|no|no

**Capabilities and samples**
```
binary
xml
grepable
json
null
redis
text (a.k.a. "list")
unicornscan
```

**import to redis**

```
> sudo masscan -p8899,8088,5566 119.97.243.42 --output-format redis -oR 127.0.0.1:6379
```
> redis-cli

```
127.0.0.1:6379> keys *
1) "192.168.1.10:8080/tcp"
2) "192.168.1.10:80/tcp"
3) "host"
4) "192.168.1.10"
5) "192.168.1.10:8181/tcp"
```