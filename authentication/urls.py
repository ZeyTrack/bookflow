from django.urls import path
from . import views

urlpatterns = [
    path('', views.userhome, name='userhome'),
    path('categories/', views.categories, name='categories'),
    path('adminhome/', views.admin_home, name='admin_home'),
    path('signup/', views.signup, name='signup'),
    path('Login/', views.Login, name='Login'),
    path('signout/', views.signout, name='signout'),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path('add/', views.add, name='add'),
    path('delete/', views.delete, name='delete'),
    path('home/', views.userhome, name='home'),
    path('my_books/', views.my_books, name='my_books'),
    path('profile/', views.profile, name='profile'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('edit_book/', views.edit_book, name='edit_book'),
]
