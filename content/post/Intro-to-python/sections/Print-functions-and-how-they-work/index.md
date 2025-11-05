---
title: Print Functions and how they work
slug: intro-to-python/sections/Print-functions-and-how-they-work
description: Learn Pythons Print Functions!
tags:
  - python
  - programming
  - tutorial
  - beginner
categories:
  - Programming
date: 2025-11-02
lastmod: 2025-11-02
draft: true
---
# Print Functions

Universally, programming languages all have some method to output data in the terminal for debugging, logging or simply for asthetic reasons. 

In python, this is the `print` function. Every manual and tutorial thanks to tradition will have you say hi to the world. *Printing* a string is as easy as:

```python
print('Hello world!')
```

*remember that strings are character variables surrounded by `''` or `""`.*

## Print beyond the strings

There is four other types of arguments that can be used in the print function. 

```python
print(*objects, sep='',  end='\n', file=sys.stdout, flush=False)
```

*Notice the comma seperation? This is how the proper way to end their portion of the line or else it will fail when ran.*

- `*objects`
  This is the data you want to print, with `*` signifying that you can print multiple objects. *numbers, variables, strong and words*

- `sep=' '`
  Represents a separator between objects defaulting to one chracter space.

- `end='\n'`
  Sets what to print at the end of an object, the default is a new line chracter.

- `file=sys.stdout`
  Allows you to set where the output is sent, the default is the terminal but you can send it to a log file.

- `flush=False`
  Indicates to python wether or not to output data imedietly or to wait. by default (`false`) python waits.  

### Examples

#### Printing multiple things at once

Basic multi printing looks like: 

```python
print('colors:)
```