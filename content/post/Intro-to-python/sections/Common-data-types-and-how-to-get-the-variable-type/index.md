---
title: Common data types and how to get the variable type
slug: intro-to-python/sections/Common-data-types-and-how-to-get-the-variable-type
description: Learn Python's common data types and how to get variable types!
Tags:
 - python
 - programming
 - tutorial
 - beginner
categories:
 - Programming
date: 2025-11-02
lastmod: 2025-11-02
draft: false
---

## Features of Python being a dynamically-typed language 

Dynamically-typed languages such as Python and JavaScript don't require explicit declaration of types for variables. These languages can determine the data types simply by what is assigned to them. 

For example: 

```python
user_name = 'cuddle-fish'
user_id = 14
```

While in statically typed languages, you have to explicitly declare data types:

```java
string username = 'cuddle-fish'
int userid = 14
```

Clearly, this makes languages like Python faster to code in with more flexibility, but the cost of this is that bugs tend to show up when programs are run, not when they are compiled.


## Most common data types in Python:

- `Integer:` An integer is a whole number with no decimal i.e, `34` or `-22`

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
- `String:` String variables are sequences of characters enclosed in single or double quotation marks, i.e `'hello world!'`

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
my_dictionary_var = {'username': 'cuddle-fish', 'userid': 34}
print('Dictionary:', my_dictionary_var)
# Dictionary: {'username': 'cuddle-fish', 'userid': 34}
```
---
- `Tuple:` immutable ordered collection enclosed in brackets `(4, 3, 1)`

```python
my_tuple_var = (4, 3, 1)
print('Tuple:', my_tuple_var)
# Tuple: (4, 3, 1)
```
---
- `Range:` often used in loops, it's a sequence of numbers `range(7)`

```python
my_range_var = range(7)
print(my_range_var)
# range(0, 7)
```
---
- `List:` an ordered collection of elements that supports different data types.

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


## Python: objects, primitives, references, and immutables

Other programming languages group data types either as primitive or reference types, with primitive types being simple and immutable, or rather unchanging when declared. While reference types can have multiple values and be immutable or mutable, in contrast, Python doesn't draw hard lines; instead, all data is treated as objects. This means objects can be mutable while others are immutable. 

### Immutables

Immutable data types can't be modified or altered once they are declared. Which means you can point them to something new or `reassignment`, but you can't change the original object by adding or removing any portion.

#### Examples of immutable data types:

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
*As you can see, we `reassigned` a different string to a variable*

```python 
greeting[0] = 'j' 
# TypeError: 'str' object does not support item assignment
```
*You can't modify a string*

#### mutable data type example:

You can edit mutable data types, adding, removing, or updating items right where they live.

- List
- Dictionary 

Example: 

```python 
nums = [3, 4, 5]
nums[0] = 6
print(nums)
# [6, 4, 5]
```
## type() and isinstance() functions: how to figure out data types of variables 

### `type()` allows you to output the data type of variables.

```python
my_var_1 = 'test'
my_var_2 = 34

print(type(my_var_1))
print(type(my_var_2))
# <class 'str'>
# <class 'int'>
```

### `isinstance()` checks if a variable matches a specific data type.

```python 
isinstance('Hello world', str) 
# True
isinstance(True, bool) 
# True
isinstance(67, int) 
# True
isinstance('sheep', int) 
# False
```

### Type hints

Even though Python is dynamically typed, you can still implement them by telling developers what data type a variable or function is expected to have.

```python 
user_name: str = 'cuddle-fish'
user_id: int = 37
```

```python 
def greet(username: str, userid: int) -> str:
  return f'Hello, {username}, user {userid}
 ```

Combining these:

```python
def greet(username: str, userid: int) -> str:
  return f'Hello, {username}, user {userid}

user_name: str = 'cuddle-fish'
user_id: int = 37

print(greet(user_name, user_id))
# hello, cuddle-fish, user 37.
```