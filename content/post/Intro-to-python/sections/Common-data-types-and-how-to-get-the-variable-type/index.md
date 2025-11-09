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
- `Boolean:` A Boolean is a `true` or `false` type.

```python 
my_boolean_var = True
print('Boolean:', my_boolean_var)
# Boolean: True
```
---
- `Set:` an unordered collection of unique items `{3, 4, 0}`

```python
my_set_var = {3, 4, 0}
print('Set:', my_set_var)
# Set: {3, 4, 0}
```
---
- `Dictionary:` collection of key-value pairs enclosed in curly braces `{'username': 'cuddle-fish', 'userid': 34}`

```python 
my_dictionary_var = {'userrname': 'cuddle-fish', 'userid': 34}
print('Dictionary:', my_dictionary_var)
# Dictionary: {'userrname': 'cuddle-fish', 'userid': 34}
```
---
- `Tuple:` immutable ordered collection enclosed in brackets `(4, 3, 1)`

```python
my_tuple_var = (4, 3, 1)
print('Tuple:', my_tuple_var)
# Tuple: (4, 3, 1)
```
---
- `Range:` often used in loops, its a sequence of numbers `range(7)`

```python
my_range_var = range(7)
print(my_range_var)
# range(0, 7)
```
---
- `List:` ordered collection of elements that supports different data types.

```python
my_list = [56, 'bye world', 4.321, False]
Print(my_list)
# [56, 'bye world', 4.321, False]
```
---
- `None:` Special value that represents the *absence* of a value.

```python
my_none_var = None
print('None:', my_none_var)
# None: None
```


## Python: objects, primitives, refrences, and immutables

Other programming languages group data types either as primitive or refrence types, with primitive types being simple and immutable or rather unchanging when declared. While refrence types can have multiple values and be immutable or mutable, in contrast, python dosent draw hardlines instead all data is treated as object. This means objects can be mutable while others are immutable. 

### Immutables

Immutable data types cant be modified or altered once they are declared. Which means you can point them to something new or `reassignment` but you cant change the original object by adding, or removing any portion.

#### Examples of immutable datat types:

- string
- integer
- float
- boolean
- tuple 
- range

Example:

```python
greeting = 'hi'
greeting = 'hello'
print(greeting) 
# hello
```
*As you can see we `reassigned` a different string to a variable*

```python 
greeting[0] = 'j' 
# TypeError: 'str' object does not support item assignment
```
*You cant directly 