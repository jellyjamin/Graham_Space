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

I didn't feel like being a terminal logger every time I added a new hardstyle track executing ```
yt-dlp --ignore-errors --format bestaudio --extract-audio --audio-format mp3 --audio-quality 160K --yes-playlist --output -o -o "download me here"...```  so I did the classic substack "debuggery". 

With these packages: 

```
import subprocess
import time
import os
```

and some intuition I got my start-up-script.py. 
