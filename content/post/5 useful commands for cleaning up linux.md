---
title: 5 Essential Linux Cleanup and Performance Commands for Self-Hosters
date: 2025-09-28
lastmod: 2025-09-28
description: Discover 5 powerful Linux commands every self-hoster should know—speed up boot times, free disk space, securely delete files, manage Docker containers, and keep your system clean.
summary: A practical guide to 5 Linux commands that help self-hosters troubleshoot startup delays, reclaim disk space, manage containers, and securely wipe data.
keywords:
  - Linux cleanup commands
  - systemd-analyze blame
  - ncdu Linux disk usage
  - secure file deletion Linux shred
  - lazydocker manage containers
  - docker system prune
  - self-hosting performance tips
tags:
  - linux
  - self-hosting
  - docker
  - systemperformance
categories:
  - guides
draft: false
featured: true
image: /img/posts/headers/5-commands-to-cleanup-linux/featured.jpg
image_alt: Linux terminal with performance and cleanup commands displayed
toc: true
reading_time: true
math: false
author: Jake Graham
---
## systemd-analyze blame 


After years of downloading and mashing in services, I've noticed that my daily loadups have taken longer and longer compared to the crisp start-up I enjoyed at first boot.
This is where `systemd-analyze blame` can help:

Run:
```
systemd-analyze blame
```

<img src="/img/posts/Inlines/5-commands-to-cleanup-linux/systemd.gif" 
     alt="Gif of the systemd-analyze blame" 
     style="max-width: 100%; height: auto;">

It will list out all of your services so you know who to... well *blame*!


## ncdu

<img src="/img/posts/Inlines/5-commands-to-cleanup-linux/ncdu.gif" 
     alt="Gif of ncdu tool running and navigating" 
     style="max-width: 100%; height: auto;">

One of the biggest pains I have in my self-hosting life is figuring out how I ended up with only 50 GB left on my drive, then comes me waiting for my [Linux Mint](https://www.linuxmint.com/)storage GUI to index my entire drive for 15 minutes. So instead, I like to use `ncdu`.

### ncdu install

```
sudo apt install ncdu
```

### Usage 

#### Scan full file system

```
ncdu -x /
```

#### Scan a specific directory

```
ncdu -x # /yourdirectory/path/here
```

#### Scan your current directory

```
ncdu
```

#### Hotkeys

- Use your keyboard's navigation arrows to move around

- `d` to delete a file or directory

- `e` to show hidden or exclusive files

- `r` to rescan your current directory

- `b` to create a shell in the directory you're looking in

- `q` to exit out of ncdu


## Shred

When you have been a Windows user, you would always forget after hitting delete over a thousand times that your stuff is really just thrown into the junk folder until your drive is due for a deep cleaning, stumbling through tech blogs on "How to clean your pc like a pro!". Ubuntu has this feature, but they bless us with an actual delete button, but even `rm` essentially just does this, but allows for the space to be overwritten. It's still recoverable, which is good to stop your mouse from eating your essay, but bad if you're finally moving your passwords from a text file. 

The solution:

```
shred # please/corrupt/me
```

- This just overwrites the file

```
shred -u
```

- Overwrites it AND deletes it

It will overwrite a file or directory multiple times, making it unrecoverable, in an age of Kali Linux MCP servers for all ages...this might save you.


## lazydocker

Lazydocker makes managing your containers and volumes simple, without using brute force commands or digging through terminal entries. 

<img src="/img/posts/Inlines/5-commands-to-cleanup-linux/lazydocker.gif" 
     alt="Gif of lazydocker running " 
     style="max-width: 100%; height: auto;">

### lazy Docker installation 

There are many ways to install lazydocker:

#### homebrew

```
brew install lazydocker
```

#### docker (my preferred method)

```
docker run --rm -it -v \
/var/run/docker.sock:/var/run/docker.sock \
-v /yourpath:/.config/jesseduffield/lazydocker \
lazyteam/lazydocker
```

- make sure to set your `-v` path for the actual config 

- set deployment as an alias: 
	- make sure to change alias and `-v` like above

```
echo "alias lzd='docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v /yourpath/config:/.config/jesseduffield/lazydocker lazyteam/lazydocker'" >> ~/.zshrc
```

#### usage

- Set an alias to run it 

```
echo "alias lzd='lazydocker'" >> ~/.zshrc
```


## Command clean-ups

I personally use these in my startup script to clean up my system's old update files or to trim my Docker images that aren't used/update them. 

Clean up old package files:

```
sudo apt autoremove --purge && sudo apt autoclean && sudo apt clean
```

This deletes unused images (so if they aren't running) while not touching their volumes. 

```
docker system prune -af
```

