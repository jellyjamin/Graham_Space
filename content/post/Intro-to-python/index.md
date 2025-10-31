---
title: "Intro to Python"
description: "Learn Python programming from basics to advanced concepts"
image: "/images/python-logo.png"
tags: ["python", "programming", "tutorial", "beginner"]
categories: ["Programming"]
date: "2025-10-31"
lastmod: "2025-10-31"
draft: false
---

![Python Logo](/images/python-logo.png)

## What is Python and How is it Used?

Python is the Swiss Army knife of the coding world, being simple to use and its libraries giving developers thousands of tools in their field.

### Data Scientists
- Libraries such as NumPy and Pandas make data analysis a breeze while TensorFlow and Scikit-learn allow anyone to dabble in machine learning.

### Web Developers
- With Flask, FastAPI, or Django web developers can build backends that are secure and easy to put together.

### Cybersecurity
- Python allows cybersecurity professionals to automate their tasks, whether it's to detect viruses or do automated scans.

### How I Use It?
- I use it for all my automation tasks. In my [daily spin ups](https://graham-space.pages.dev/p/my-daily-spin-ups-as-a-self-hoster/) article I give my personal remote backup/encryption script built in Python.

## How to Install Python?

### Windows
Simply head over to the [Python download section](https://www.python.org/downloads/) and download the Python installer. Make sure to check "Add Python to PATH" during installation.

### Linux
Linux installation is as easy as using this single line of commands:

```bash
sudo apt update && sudo apt install python3
```

### macOS
On macOS, you can install Python using Homebrew:

```bash
brew install python3
```

## Table of Contents

1. [Variables & Data Types](#variables-data-types)
2. [Control Flow](#control-flow)
3. [Functions](#functions)
4. [Data Structures](#data-structures)
5. [Object-Oriented Programming](#object-oriented-programming)
6. [File Handling](#file-handling)
7. [Popular Libraries](#popular-libraries)
8. [Practice Projects](#practice-projects)

---

## Variables & Data Types

Variables in Python are containers for storing data values. Python has several built-in data types that you can use to store different kinds of information.

### Variable Naming Rules
- Must start with a letter (a-z, A-Z) or underscore (_)
- Can contain letters, numbers, and underscores
- Case-sensitive (myVar and myvar are different)
- Cannot use reserved keywords (like `if`, `for`, `while`, etc.)

### Basic Data Types

#### Numbers
```python
# Integers (whole numbers)
age = 25
year = 2025

# Floats (decimal numbers)
price = 19.99
temperature = 98.6

# Complex numbers
complex_num = 3 + 4j
```

#### Strings
```python
# Single or double quotes
name = "Jake"
language = 'Python'

# Multi-line strings
description = """This is a
multi-line string
in Python."""

# String concatenation
greeting = "Hello, " + name + "!"
```

#### Booleans
```python
# Boolean values
is_learning = True
has_completed = False

# Boolean operations
and_result = True and False  # False
or_result = True or False    # True
not_result = not True        # False
```

#### Lists
```python
# Ordered, mutable collections
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Lists can contain mixed types
mixed = [1, "hello", 3.14, True]
```

#### Tuples
```python
# Ordered, immutable collections
coordinates = (10, 20)
person = ("John", 25, "Engineer")
```

#### Dictionaries
```python
# Key-value pairs
person = {
    "name": "Jake",
    "age": 25,
    "job": "Developer"
}

# Accessing values
print(person["name"])  # Output: Jake
```

### Type Conversion
```python
# Convert between types
str_num = "42"
int_num = int(str_num)    # Convert to integer
float_num = float("3.14") # Convert to float
string_num = str(123)     # Convert to string
```

---

## Control Flow

Control flow allows you to make decisions and repeat actions in your programs.

### Conditional Statements

#### If Statements
```python
age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

#### Elif Statements
```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Your grade is: {grade}")
```

#### Ternary Operator
```python
status = "adult" if age >= 18 else "minor"
```

### Loops

#### For Loops
```python
# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop through a range
for i in range(5):
    print(i)  # Output: 0, 1, 2, 3, 4

# Loop with index
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")
```

#### While Loops
```python
count = 0
while count < 5:
    print(f"Count is: {count}")
    count += 1
```

#### Break and Continue
```python
for i in range(10):
    if i == 3:
        continue  # Skip iteration
    if i == 7:
        break     # Exit loop
    
    print(i)  # Output: 0, 1, 2, 4, 5, 6
```

### List Comprehensions
```python
# Create a new list with comprehension
squares = [x**2 for x in range(1, 6)]
# Result: [1, 4, 9, 16, 25]

# With condition
evens = [x for x in range(10) if x % 2 == 0]
# Result: [0, 2, 4, 6, 8]
```

---

## Functions

Functions are reusable blocks of code that perform specific tasks.

### Basic Function Definition
```python
def greet(name):
    return f"Hello, {name}!"

# Call the function
message = greet("Python")
print(message)  # Output: Hello, Python!
```

### Functions with Multiple Parameters
```python
def add_numbers(a, b):
    return a + b

def calculate_area(length, width):
    area = length * width
    return area

# Using the functions
sum_result = add_numbers(5, 3)       # 8
area = calculate_area(10, 5)        # 50
```

### Default Parameters
```python
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 9 (3^2)
print(power(3, 3))  # 27 (3^3)
```

### Variable Arguments
```python
# *args for variable positional arguments
def sum_all(*args):
    return sum(args)

result = sum_all(1, 2, 3, 4, 5)  # 15

# **kwargs for variable keyword arguments
def create_person(**kwargs):
    return f"Name: {kwargs.get('name', 'Unknown')}, Age: {kwargs.get('age', 0)}"

person = create_person(name="Alice", age=30)
```

### Lambda Functions
```python
# Anonymous functions
square = lambda x: x ** 2
print(square(5))  # 25

# Using with map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

### Scope and Global Variables
```python
global_var = "I'm global"

def example_function():
    local_var = "I'm local"
    print(global_var)   # Accessible
    print(local_var)    # Accessible within function

# Global variable modification
def modify_global():
    global global_var
    global_var = "Modified globally"

modify_global()
print(global_var)  # Output: Modified globally
```

---

## Data Structures

Python provides several built-in data structures for organizing and managing data efficiently.

### Lists (Mutable Sequences)
```python
# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]

# Common list methods
fruits.append("grape")           # Add to end
fruits.insert(1, "mango")       # Insert at index
fruits.remove("banana")         # Remove by value
last_fruit = fruits.pop()       # Remove and return last item
fruits.sort()                   # Sort in place
fruits.reverse()                # Reverse in place

# List operations
combined = fruits + ["grape"]   # Concatenation
fruits * 3                      # Repetition
len(fruits)                     # Length
"apple" in fruits               # Membership test
```

### Tuples (Immutable Sequences)
```python
# Creating tuples
coordinates = (10, 20)
person = ("Alice", 30, "Engineer")

# Tuple operations
x, y = coordinates              # Unpacking
first_item = person[0]          # Indexing
name, age, job = person         # Multiple unpacking
```

### Dictionaries (Key-Value Mapping)
```python
# Creating dictionaries
student = {
    "name": "Bob",
    "age": 21,
    "grades": [85, 92, 78]
}

# Dictionary operations
student["age"] = 22             # Update value
student["major"] = "CS"         # Add new key-value
age = student.get("age", 0)     # Safe access with default
keys = student.keys()           # Get all keys
values = student.values()       # Get all values
items = student.items()         # Get key-value pairs

# Dictionary comprehension
squared = {x: x**2 for x in range(5)}
```

### Sets (Unique Collections)
```python
# Creating sets
unique_numbers = {1, 2, 3, 3, 3}  # {1, 2, 3}
colors = set(["red", "green", "blue"])

# Set operations
colors.add("yellow")            # Add element
colors.remove("green")          # Remove element
union = {1, 2} | {2, 3}         # Union
intersection = {1, 2} & {2, 3}  # Intersection
difference = {1, 2} - {2, 3}    # Difference
```

### Working with Strings
```python
text = "Hello, Python World!"

# String methods
upper_text = text.upper()       # Convert to uppercase
lower_text = text.lower()       # Convert to lowercase
words = text.split()            # Split into words
joined = " ".join(["Hello", "World"])  # Join words
replace_text = text.replace("World", "Universe")  # Replace substring

# String formatting
name = "Python"
version = 3.9
message = f"Welcome to {name} {version}"  # f-strings
old_way = "Welcome to %s %d" % (name, 9)  # Format operator
format_way = "Welcome to {} {}".format(name, 9)  # format method
```

---

## Object-Oriented Programming

Python supports object-oriented programming (OOP) concepts like classes and objects.

### Classes and Objects
```python
class Person:
    # Class attribute
    species = "Homo sapiens"
    
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old."
    
    def have_birthday(self):
        self.age += 1
        return f"Happy birthday! Now I'm {self.age} years old."

# Creating objects
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

print(person1.greet())
print(person2.have_birthday())
```

### Inheritance
```python
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Call parent constructor
        self.student_id = student_id
    
    def study(self):
        return f"{self.name} is studying with ID: {self.student_id}"
    
    def greet(self):  # Method overriding
        return f"Hello, I'm {self.name}, a student with ID {self.student_id}."

student = Student("Charlie", 20, "S12345")
print(student.greet())
print(student.study())
```

### Encapsulation (Private Attributes)
```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance  # Protected attribute
        self.__pin = "1234"      # Private attribute
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return f"Deposited ${amount}. New balance: ${self._balance}"
        return "Invalid amount"
    
    def get_balance(self):
        return f"Balance: ${self._balance}"
    
    def _validate_pin(self, pin):
        return pin == self.__pin

account = BankAccount("John", 1000)
print(account.deposit(500))
print(account.get_balance())
# print(account.__pin)  # This would raise an AttributeError
```

### Polymorphism
```python
class Animal:
    def speak(self):
        raise NotImplementedError("Subclass must implement speak method")

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class Bird(Animal):
    def speak(self):
        return "Tweet!"

# Using polymorphism
animals = [Dog(), Cat(), Bird()]
for animal in animals:
    print(animal.speak())
```

---

## File Handling

Python provides built-in functions for reading from and writing to files.

### Opening and Reading Files
```python
# Reading entire file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes newline characters

# Reading specific number of characters
with open("example.txt", "r") as file:
    first_100_chars = file.read(100)
```

### Writing to Files
```python
# Writing (overwrites existing content)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.")

# Appending to file
with open("output.txt", "a") as file:
    file.write("\nThis line is appended.")

# Writing multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
```

### Working with JSON
```python
import json

# Writing JSON
data = {
    "name": "John",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"]
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)

# Reading JSON
with open("data.json", "r") as file:
    loaded_data = json.load(file)
    print(loaded_data["name"])
```

### Working with CSV
```python
import csv

# Writing CSV
with open("employees.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Age", "Department"])
    writer.writerow(["Alice", 25, "Engineering"])
    writer.writerow(["Bob", 30, "Marketing"])

# Reading CSV
with open("employees.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Name']} works in {row['Department']}")
```

### File System Operations
```python
import os

# Check if file exists
if os.path.exists("example.txt"):
    print("File exists")

# Get file size
size = os.path.getsize("example.txt")
print(f"File size: {size} bytes")

# List directory contents
files = os.listdir(".")
for file in files:
    print(file)

# Create directory
os.makedirs("new_folder", exist_ok=True)
```

---

## Popular Libraries

Python's extensive library ecosystem is one of its biggest strengths. Here are some of the most popular libraries:

### Data Analysis Libraries
```python
# NumPy - Numerical computing
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
mean_value = np.mean(arr)
result = np.dot([1, 2], [3, 4])  # Matrix multiplication

# Pandas - Data manipulation
import pandas as pd

# Create DataFrame
data = {
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "department": ["Sales", "IT", "HR"]
}
df = pd.DataFrame(data)

# Data operations
average_age = df["age"].mean()
sales_employees = df[df["department"] == "Sales"]
```

### Web Development
```python
# Flask - Lightweight web framework
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/user/<name>")
def user(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    app.run(debug=True)

# FastAPI - Modern, fast web framework
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

### Machine Learning
```python
# Scikit-learn - Machine learning
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load sample dataset
boston = datasets.load_boston()
X, y = boston.data, boston.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
```

### Visualization
```python
# Matplotlib - Plotting library
import matplotlib.pyplot as plt

# Create a simple plot
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y)
plt.title("Square Numbers")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()

# Seaborn - Statistical data visualization
import seaborn as sns

# Load sample dataset
tips = sns.load_dataset("tips")

# Create a plot
sns.barplot(data=tips, x="day", y="total_bill")
plt.title("Average Total Bill by Day")
plt.show()
```

### Web Scraping
```python
# BeautifulSoup - HTML parsing
from bs4 import BeautifulSoup
import requests

# Make a request
url = "https://example.com"
response = requests.get(url)

# Parse HTML
soup = BeautifulSoup(response.content, "html.parser")

# Extract data
title = soup.title.text
links = soup.find_all("a")

# Selenium - Browser automation
from selenium import webdriver

# Setup browser
driver = webdriver.Chrome()
driver.get("https://example.com")

# Interact with page
element = driver.find_element_by_id("example")
element.click()

# Close browser
driver.quit()
```

### Testing
```python
# UnitTest - Built-in testing framework
import unittest

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
    
    def test_divide(self):
        self.assertEqual(divide(6, 2), 3)
        self.assertRaises(ValueError, divide, 5, 0)

# Pytest - Advanced testing framework
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_divide():
    assert divide(6, 2) == 3
    with pytest.raises(ValueError):
        divide(5, 0)
```

---

## Practice Projects

Now that you've learned the fundamentals, here are some hands-on projects to practice your Python skills:

### Project 1: Personal Budget Tracker
**Difficulty:** Beginner  
**Skills:** Variables, lists, dictionaries, file handling, functions

Create a simple budget tracker that:
- Asks for monthly income and expenses
- Categorizes expenses (food, rent, entertainment, etc.)
- Calculates total expenses and remaining money
- Saves data to a file
- Can load and display previous months' data

### Project 2: To-Do List Application
**Difficulty:** Beginner to Intermediate  
**Skills:** Lists, file handling, functions, user input

Build a command-line to-do list that:
- Adds new tasks
- Marks tasks as complete
- Lists all tasks
- Saves/loads from a file

### Project 3: Password Generator
**Difficulty:** Beginner  
**Skills:** Strings, random module, functions

Create a password generator that:
- Asks for password length
- Includes options for uppercase, lowercase, numbers, and symbols
- Generates secure passwords
- Evaluates password strength

### Project 4: Simple Text Adventure Game
**Difficulty:** Intermediate  
**Skills:** Dictionaries, loops, functions, classes

Build a text-based adventure game with:
- Multiple rooms/locations
- Inventory system
- Player actions (move, look, take, use)
- Simple story progression

### Project 5: Data Analysis Dashboard
**Difficulty:** Intermediate to Advanced  
**Skills:** Pandas, Matplotlib, file handling, data visualization

Create a dashboard that:
- Reads CSV data
- Performs data analysis
- Creates visualizations
- Exports summary reports

### Project 6: Web Scraper for News
**Difficulty:** Intermediate to Advanced  
**Skills:** BeautifulSoup, requests, data storage, functions

Build a news scraper that:
- Scrapes headlines from news websites
- Stores article information
- Creates a simple report
- Handles different website structures

### Project 7: REST API with FastAPI
**Difficulty:** Advanced  
**Skills:** FastAPI, HTTP methods, data validation, documentation

Create a REST API with endpoints for:
- User management (CRUD operations)
- Data validation
- Interactive documentation
- Error handling

### Project 8: Machine Learning Model
**Difficulty:** Advanced  
**Skills:** Scikit-learn, pandas, data preprocessing, model evaluation

Build a machine learning pipeline that:
- Loads and cleans data
- Trains multiple models
- Evaluates performance
- Makes predictions on new data

### Tips for Project Success
1. **Start Small:** Begin with basic functionality and add features incrementally
2. **Plan First:** Write pseudocode or create flowcharts before coding
3. **Test Often:** Write tests as you build to catch bugs early
4. **Document Code:** Add comments explaining your logic
5. **Handle Errors:** Include error handling for user inputs and edge cases
6. **Use Version Control:** Commit your progress regularly
7. **Ask for Help:** Don't hesitate to look up documentation or ask questions

### Going Further
- **Build a GUI:** Use tkinter or PyQt for graphical interfaces
- **Deploy Online:** Use platforms like Heroku, AWS, or Google Cloud
- **Add Unit Tests:** Improve code reliability with automated testing
- **Optimize Performance:** Learn about time and space complexity
- **Explore Advanced Topics:** Look into decorators, generators, and context managers

Remember: The best way to learn programming is by doing. Start with projects that interest you and challenge yourself to build something useful!

---

*Congratulations! You've completed the comprehensive Intro to Python tutorial. Practice these concepts regularly and build projects to reinforce your learning. Happy coding!*