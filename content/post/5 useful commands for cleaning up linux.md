
## systemd-analyze blame 


After years of downloading and mashing in services, i've noticed that my daily loadups have taken longer and longer compared to the crisp start up I enjoyed at first boot.
This is where `systemd-analyze blame` can help:

Run:
```
systemd-analyze blame
```

# place gif here

It will list out all of your services so you know who to....well *blame*!


## ncdu

One of the biggest pains I have in my self-hosting life is figuring out how I ended up with only 50gb left on my drive, then comes me waiting for my [linux mint](https://www.linuxmint.com/)storage GUI to index my entire drive for 15 minutes. So instead i like to use `ncdu`.

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

- Use your keyboards navigation arrows to move around

- `d` to delete a file or directory

- `e` to show hidden or exclusive files

- `r` to rescan your current directory

- `b` to create a shell in the directory you're looking in

- `q` to exit out of ncdu