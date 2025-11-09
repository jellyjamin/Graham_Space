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
date: 2025-11-05
lastmod: 2025-11-05
draft: false
---
# Print Functions

Universally, programming languages all have some method to output data in the terminal for debugging, logging, or simply for aesthetic reasons. 

In Python, this is the `print` function. Every manual and tutorial, thanks to tradition, will have you say hi to the world. *Printing* a string is as easy as:

```python
print('Hello world!')
```

*remember that strings are character variables surrounded by `''` or `""`.*

## Print beyond the strings

Four other types of arguments can be used in the print function. 

```python
print(*objects, sep='',  end='\n', file=sys.stdout, flush=False)
```

*Notice the comma separation? This is the proper way to end their portion of the line, or else it will fail when run.*

- `*objects`
 This is the data you want to print, with `*` signifying that you can print multiple objects. *numbers, variables, and strings*

- `sep=' '`
 Represents a separator between objects, defaulting to one character space.

- `end='\n'`
 Sets what to print at the end of an object; the default is a new line character.

- `file=sys.stdout`
 Allows you to set where the output is sent; the default is the terminal, but you can send it to a log file.

- `flush=False`
 Indicates to Python whether or not to output data imedietly or to wait. by default (`false`) python waits.  

### Examples

#### Printing multiple things at once

Basic multi-printing looks like: 

```python
print('colors:', 'blue', 'yellow', 'green')

# output: colors: blue yellow green
```

*As you can see, the default of `sep=' '` which is one character space is used. 

Using the `sep`, we change what Python puts at the end of the line. 

```python 
print('colors:', 'blue', 'yellow', 'green', sep=', ')

# output: colors:, blue, yellow, green
```

*You may have noticed that this is a bit funky, since `colors` has a `,` at the end.*

This is where `string concatenation` comes into play. To get rid of the comma, remove the space in the string directly and use a plus sign. 

```python
print('colors: ' + 'blue', 'yellow', 'green', sep=', ')

# output: colors: blue, yellow, green
```
`String concatenations` combine multiple strings into one; in this example, your merging `colors:` and `blue`. Essentially, Python sees it as `colors: blue,`.

#### The end parameter: unlocking customization

As mentioned above, the default of `end='\n'` is to go to the next line (below the last line) like this:

```python
print('colors:')
pirint('blue')
prnt('yellow')
print('green')

# output:
# colors:
# blue
# yellow
# green
```

This can be changed easily to function like the previous example and can add more control over the output:

```python 
print('colors:', end=' ')
pirint('blue', end=', ')
prnt('yellow', end=', ')
print('green', end='.')

# output: colors: blue, yellow, green. 
```

#### `file=` connecting to your data

You can use `file` to directly write your `print` output down outside of the terminal.

```python
with open('output.txt', 'w') as f:
   print('Hello world!', file=f)
```
This writes `Hello world!` into `output.txt`, creating the output file even if it doesn't exist. 

#### `flush` or rather getting to the point.

When the flush argument is set to true, it outputs the string instantly.

```python
import time 

print('Processing...', end=' ', flush=True)
time.sleep(2)
print('Done!')
```

This code would instantly show you `processing..` thanks to flush, wait 2 seconds, then output `done!`.

# Next section [Common data types and how to get the variable type](https://graham-space.pages.dev/p/intro-to-python/sections/Common-data-types-and-how-to-get-the-variable-type)
