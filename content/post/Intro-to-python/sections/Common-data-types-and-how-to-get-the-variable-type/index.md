---
title: Common data types and how to get the variable type
slug: intro-to-python/sections/Common-data-types-and-how-to-get-the-variable-type
description: Learn Pythons common data types and how to get variable types!
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

## Features of python being a dynamically-typed language 

Dynamically-typed languages such as Python and JavaScript dont require explicit decleration of types for variables. These language can determine the data types simply by what is assigned to it. 

For example: 

```python
user_name = 'cuddle-fish'
user_id = 14
```

While in statically-types languages, you have to excplictly declare data types:

```java
string username = 'cuddle-fish'
int userid = 14
```

Clearly this makes languages like python faster to code in with more flexibility, the cost to this is that bugs tend to show up when programs are run, not when they are compiled.


## Most common data typed in Python:

- `Integer:` An integer is a whole number with not decimile i.e `34` or `-22`

```python
my_integer_var = 34
print('Integer:', my_integer_var)
# Integer: 34
```
---
- `Float:` Floats are numbers with decimal points, like `3.4` or `-0.234`

```python
my_float_var = 3.4
print('Float:', my_float_var)
# Float: 3.4
```
---
- `Complex:` Complex variables are numbers with real and imaginary parts like `3 + 8z`

```python 
my_complex_var = 3 + 8z
print('Complex:', my_complex_var)
# Complex: (3+8z)
```
---
- `String:` String varibales are sequences of chracters enclosed in single or double quotation marks i.e `'hello world!'`

```python 
my_string_var = 'hi'
print('String:', my_string_var)
# String: hi
```
---