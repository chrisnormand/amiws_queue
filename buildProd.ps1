$env:WS_URL="'ws://<you-amiws-server>:8000'"
yarn build
cd .\dist\
Rename-Item -Path "index.html" -NewName "queues.html"