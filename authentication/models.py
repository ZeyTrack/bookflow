from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):  # Renamed to Book to follow the standard class naming convention
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    book_id = models.CharField(max_length=500, default='')
    description = models.TextField()
    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to='book_images/')  # Specify upload directory
    borrowed_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='borrowed_books')  # Add this line
 
 
    def __str__(self):
        return self.title
