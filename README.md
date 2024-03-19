# amiws_queue
![GPL](https://img.shields.io/badge/license-GPL_3-green.svg "License")

>[!WARNING]
>This project is a simple fork from an outdated project no longer supported : [amiws](https://github.com/staskobzar/amiws). 
So you can use it on your own risk.
>vuejs used in the project is very old and probably will not work with new node versions

 ## Asterisk Queues Realtime Manager

Web realtime dashboard for Asterisk Queues. It is using another project, [amiws](https://github.com/staskobzar/amiws), as a Back-End for AMI traffic to web-socket conversion. 

More [screenshots here](https://staskobzar.blogspot.ca/2017/12/asterisk-queues-realtime-dashboard-with.html).

![amiws_queue screenshot](/screenshot.png)

## Build Setup

Refere to [amiws](https://github.com/staskobzar/amiws) documentation to learn how to install and setup Back-End.

This project uses VueJS with webpack and it requires NodeJS. Setup as following (on Windows):
```
git clone https://github.com/chrisnormand/amiws_queue.git
cd amiws_queue
yarn install
```

For the build on Windows, you can use `buildProd.ps1` :

```
$env:WS_URL="'ws://<you-amiws-server>:8000'"
yarn build
cd .\dist\ && Rename-Item -Path "index.html" -NewName "queues.html"
```

Use an IP and port of the server where amiws is running when defining env variable ```WS_URL```.
Note, when defining WS_URL usage of double and single quotes : _"'ws://IPADDR:PORT'"_.

After successful build files are stored in "dist" folder. Simply copy files from "dist" folder to the server with "amiws" Back-End, to the folder defined in parameter "web_root" of "amiws" config file.
You should access you page at `http://<you-amiws-server>:8000/queues.html`.

## Asterisk configuration

This dashboard was tested with Asterisk 20. Should work with other versions too (AMI v2 and before).
Asterisk queues additional events MUST be enabled per queue.

In configuration file (Asterisk version older 12):
```
eventmemberstatus = yes
eventwhencalled = yes
```

When using realtime with DB this values must equal "1": ``` eventmemberstatus = 1, eventwhencalled = 1 ```

