# authentication/admin.py
from django.contrib import admin
from .models import Book  # Import the Book model with the correct class name

admin.site.register(Book)  # Register the Book model with the admin site
