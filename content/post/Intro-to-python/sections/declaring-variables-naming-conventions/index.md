---
title: Declaring variables and their naming conventions
slug: intro-to-python/sections/declaring-variables-naming-conventions
description: Learn Python programming from basics to advanced concepts
tags:
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

## What are variables?

In Python, variables simply let you label and store/reference data. For example:

### strings

```python
name = 'sir richard'
```
Strings represent text characters either quoted with `''` or `""`

### standard variables

```python
# in cm
height = 65
```

## Syntax rules for variable names

- Variable names cant start with numbers, only underscores or letters.

- You cant use special characters in name.

- They are case sensitive and are treated unique if cases differ.

### breaking these rules will spitout a `SyntaxError` and display it in the logs.

## Industry practices

- variables should be lower case

```python
user_name = 'graham_space'
```

- Descriptive names are the got to, you want people to be able to read your code and understand it. For example, a varible for ticker price should clearly say `ticker_price` not `tp`, `price` or `ticker`.

## Comments

Code documentation is essential not only for others but for yourself to understand what your code does. in python, `#` comments all things after in a line.

```python
# this is a comment

this is not a comment
```


# Next section: [Print Functions and how they work](https://graham-space.pages.dev/p/intro-to-python/sections/Print-functions-and-how-they-work) 