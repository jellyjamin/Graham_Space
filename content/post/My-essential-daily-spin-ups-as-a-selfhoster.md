---
title: My daily spin ups as a selfhoster
date:
tags:
  - docker
  - python
  - My-scripts
  - Selfhost
categories:
  - technology
draft: true
summary:
slug:
image: "/img/posts/headers/ "
---
## To do
- [ ] make summary
- [ ] add slug
- [ ] add header image
- [ ] add date
- [ ] delete placeholder photos
	- [ ] upload my basic startup script to github as a template
- [ ] add notable mentions section

## **S**elf hosting for many of us starts just as a one off project that through the first search gives a wall www's that may do what you want for a fee or even may be free through a ad filled webpage advertising your amazon search history in the sidebars. 

### Yt-dlp

- https://github.com/yt-dlp/yt-dlp

<img src="/img/posts/Inlines/My-daily-spin-ups-as-a-selfhoster/Yt-dlp-github.png" 
     alt="Yt-dlp" 
     style="max-width: 100%; height: auto;">
![[Pasted image 20250923140820.png]]
This is where I found myself two years ago when looking for how to simply download my music playlist from Youtube, which at the time as a broke college student was demanding the same amount as my prime subscription and yet I would have my custom mixes of my favorite songs deleted anyways. 

I found [Yt-dlp](https://github.com/yt-dlp/yt-dlp) in a reddit post, which I learned not only did what I wanted (download videos but whole playlists) but how I wanted it to (in nearly any audio or video format) except one part....be as hands off as Youtube premium. 


### My start up script

- https://github.com/jellyjamin/Scripts/blob/main/startup-script/startup-script-template.py

I didn't feel like being a terminal logger every time I added a new hardstyle track executing ```
yt-dlp --ignore-errors --format bestaudio --extract-audio --audio-format mp3 --audio-quality 160K --yes-playlist --output -o -o "download me here"...```  so I did the classic Substack *debuggery*. 

With these packages: 

```
import subprocess
import time
import os
```

and some intuition I got my [start-up-script.py](https://github.com/jellyjamin/Scripts/blob/main/startup-script/startup-script-template.py). 

<img src="/img/posts/Inlines/My-daily-spin-ups-as-a-selfhoster/Startup-script.png" 
     alt="startup-script" 
     style="max-width: 100%; height: auto;">
![[Pasted image 20250924135329.png]]

Which is fully modular allowing me to not only automate my playlist downloads, but I could automate updates for my packages, dockers, and even general house keeping on my system. 


## Syncthing

- https://syncthing.net/

<img src="/img/posts/Inlines/My-daily-spin-ups-as-a-selfhoster/syncthing-site.png" 
     alt="Syncthing" 
     style="max-width: 100%; height: auto;">
![[Pasted image 20250924140310.png]]

With my music downloaded thanks to Yt-dlp and the downloads automated, I just had to figure out how to get the files on my phone. I searched through the multitude of ways, I could go through the cloud with one drive or google drive but I wanted my data on my time, all the time. So I chose syncthing which is a self-hosted file syncing platform that doesn't require a terminal and allows easy cross-device syncing. Not only is it entirely hosted on your own devices but you can host relays to contribute to the network! I could make my own cloud storage and nobody has that data but me. Afraid of some loaded script from another device or a folder with a friend? then just slap in what you want in the ignore patterns feature.

To this day I have synced my:

- obsidian notes
- Important phone folders to back up
- emulator save files


## Immich

- https://immich.app/

<img src="/img/posts/Inlines/My-daily-spin-ups-as-a-selfhoster/Immich-site.png" 
     alt="Immich" 
     style="max-width: 100%; height: auto;">
![[Pasted image 20250924144927.png]]

 [immich](https://immich.app/) is essentially a self hosted google photos app, that gives you all of the luxuries of google photos or Icloud but on your machine with features like:

- Duplicate cleanup
- automated backups
- search 
- photo gallery
- even people matching

That's as easy to spin up as any other docker and devices an app download away from just working.




## My backup and encryption script


### The beauty of a being *self-hoster* is that you can choose your pros and your cons or even better, only your pros. 

I like having my own cloud, which still has one major downfall to *big-drive* and that's redundancy so I made my solution. My back up script compresses watched folders using pyzipper which has upgraded AES encryption compared to legacy zippers then uploads them to my vps in neat and dated. The tricky back up was immich, which has a three part back up for easy restoring which so it required specific code (but you can just set it to false). I also added a file size checks, just to avoid wasting bandwidth and time so that it only backs up what's new. Its certainly not the most secure method but I double encrypt my sensitive back ups anyways using [keypassxc](https://keepassxc.org/).



