
from django.db import IntegrityError
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import EmailMessage, send_mail
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from . tokens import generate_token
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .models import Book
from .forms import BookForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Book


@login_required
def borrow_book(request, book_id):
    if request.method == 'POST':
        try:
            book = Book.objects.get(id=book_id)
            if book.borrowed_by is None:  # Check if the book is not already borrowed
                book.borrowed_by = request.user
                book.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'message': 'Book is already borrowed'})
        except Book.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Book does not exist'})
    return JsonResponse({'success': False, 'message': 'Invalid request'})

@login_required
def my_books(request):
    borrowed_books = Book.objects.filter(borrowed_by=request.user)
    return render(request, "authentication/my_books.html", {'borrowed_books': borrowed_books})


def categories(request):
    title = request.GET.get('search_name', '')  # Get the search query from the GET parameters
    categories = Book.objects.values('category').distinct()  # Get all distinct categories
    category_books = {}
   
    for category in categories:
        category_name = category['category']
        if title:  # If there is a search query
            books = Book.objects.filter(category=category_name, title__icontains=title)  # Filter books by category and search query
        else:
            books = Book.objects.filter(category=category_name)  # Otherwise, get all books in the category
        category_books[category_name] = books

    return render(request, "authentication/categories.html", {'category_books': category_books})

def userhome(request):
     if request.user.is_superuser:  # Check if the user is an admin
        return redirect('admin_home')  # Redirect to admin home
     else:
        return render(request, "authentication/userhome.html")



def signup(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirmPassword = request.POST.get('confirmPassword')

        is_admin = request.POST.get('is_admin') == 'yes'  # True if admin, False if user
           # Validate email format
        try:
            validate_email(email)
        except ValidationError:
            messages.error(request, "Please enter a valid email address.")
            return render(request, "authentication/signup.html")


        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists! Please try again.")
            return render(request, "authentication/signup.html")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered!")
            return render(request, "authentication/signup.html")
        if username=='':
            messages.error(request,   "Username is required")
            return render(request, "authentication/signup.html")
        if email=='':
                    messages.error(request,   "Email is required")
                    return render(request, "authentication/signup.html")
        if len(username) > 10 :
            messages.error(request, "Username must be under 10 characters")
            return render(request, "authentication/signup.html")
        if len(password) <10 :
            messages.error(request, "Password must be over 8 characters")
            return render(request, "authentication/signup.html")
        
        if password=='':
            messages.error(request,   "Password is required")
            return render(request, "authentication/signup.html")
        if password != confirmPassword:
            messages.error(request, "Passwords do not match!")
            return render(request, "authentication/signup.html")


        try:
            myuser = User.objects.create_user(username, email, password)
            myuser.first_name = username
            myuser.is_active = False
            myuser.is_superuser = is_admin 
            myuser.save()
        
            messages.success(request,"Your Account has been successfully created. We have sent you a confirmation email, please confirm your email in order to activateypur account. ")


            #welcome massege
            subject="Welcome to our library!"
            massage ="Hello "+myuser.username+" ! \n" +" Welcom to BookNest! \n Thank you for visting our website \n Please confirm your email address in order to activateypur account. \n\n Thanking You Amira DABBAK"
            from_email = settings.EMAIL_HOST_USER
            to_list= [myuser.email]
            send_mail(subject,massage,from_email,to_list, fail_silently=True)
            
            #email confirmation 
            current_site=get_current_site(request)
            email_subject= "Confirm your email!"
            message2 = render_to_string('authentication/email_confirmation.html',{
                
                'name': myuser.first_name,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
                'token': generate_token.make_token(myuser)
            })
            email =EmailMessage(
                email_subject,
                message2,
                settings.EMAIL_HOST_USER,
                [myuser.email],
            )
            email.fail_silently =True
            email.send()
            

                
        except IntegrityError:
            messages.error(request, "An error occurred while creating your account.")
            return render(request, "authentication/signup.html")

    return render(request, "authentication/signup.html", {'messages': messages.get_messages(request)})

    




def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
        print("Error:", e)
        myuser = None

    if myuser is not None and generate_token.check_token(myuser, token):
        myuser.is_active = True
        myuser.save()
        login(request, myuser)
        return redirect('userhome')
    else:
        print("Activation failed")
        return render(request, 'authentication/activation_failed.html')


def Login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return render(request, "authentication/userhome.html")
        else:
            messages.error(request, "Bad credentials!")
            return render(request, "authentication/Login.html", {'messages': messages.get_messages(request)})

    return render(request, "authentication/Login.html", {'messages': messages.get_messages(request)})


def signout(request):
    logout(request)
    messages.success(request, "Logged out successfuly!")
    return redirect('userhome')
 
def add(request):
    if request.method == 'POST':
        prod=Book()
        prod.title = request.POST.get('title')
        prod.author = request.POST.get('author')
        prod.image = request.FILES.get('img')
        prod.description = request.POST.get('desc')
        prod.category = request.POST.get('book')
        prod.book_id=request.POST.get('id1')
        if len(request.FILES) !=0:
            prod.image = request.FILES['img']


        if prod.title:
            # Create a new Book object and save it
            data = Book(title=prod.title, author=prod.author, image=prod.image, description=prod.description, category=prod.category,book_id=prod.book_id)
            data.save()


            return render(request, "authentication/add.html")

    # If it's not a POST request or title is empty, render the form page
    return render(request, "authentication/add.html")


def my_books(request):
    # Implement your logic for displaying user's books here
    return render(request, "authentication/my_books.html")

def profile(request):
    # Implement your logic for displaying user profile here
    return render(request, "authentication/profile.html")

def admin_home(request):
    return render(request, "authentication/admin_home.html")

from django.shortcuts import get_object_or_404

from django.shortcuts import render, redirect, get_object_or_404

def edit_book(request):
    if request.method == "POST":
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, pk=book_id)

        book.title = request.POST.get('title')
        book.author = request.POST.get('author')
        book.category = request.POST.get('category')
        book.description = request.POST.get('description')

        if 'img' in request.FILES:
            book.image = request.FILES['img']

        book.save()
        return redirect('admin_home')

    return render(request, 'authentication/EditBook.html')

from django.http import HttpResponse
def delete(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        try:
            book = get_object_or_404(Book, book_id=book_id)
            book.delete()
            return redirect('categories') # Redirect to the admin home page after deletion
        except Exception as e:
            return HttpResponse(f"Error: {e}")

    return render(request, 'authentication/delete.html')

