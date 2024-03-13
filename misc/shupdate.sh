#!/bin/bash
# curl -fsSL https://woofledev.github.io/file/shupdate.sh | bash

#colors
lb="\\e[94m"
yel="\\e[93m"
END="\\e[0m"
 
echo -e "${lb}shupdate 1.0${END}".
echo ""
 
echo -e "${yel}S1: update${END}"
sudo apt update
echo -e "${yel}S2: full & dist upgrade${END}"
sudo apt full-upgrade -y
sudo apt dist-upgrade -y
echo -e "${yel}S3: cleaning up${END}"
sudo apt clean -y
echo -e "${lb}done! optionally, restart or run sudo apt autoremove.${END}"
echo ""
sleep 3
exit 0
