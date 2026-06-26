# 📚 BookFlow

A full-featured book management web application built with Django. Users can browse, borrow, and manage books across multiple categories, with personalized profiles and a favorites list.

---

## 🚀 Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely
- 👤 **Reader Profile** — Each user has a personal profile page
- 📖 **Borrow Books** — Users can borrow available books
- ❤️ **Favourites** — Add books to a personal favourites list
- ➕ **Add & Edit Books** — Users can add new books and edit existing ones
- 🔍 **Search** — Search for books by title or author
- 🖼️ **Book Cover Upload** — Upload cover images for books
- 🗂️ **Categories** — Browse books by category:
  - Horror
  - Historical Fiction
  - Fantasy
  - Children's
  - Science Fiction
- 🛠️ **Admin Dashboard** — Full admin panel to manage users and books

---

## 🛠️ Tech Stack

- **Backend:** Python, Django
- **Database:** SQLite
- **Frontend:** HTML, CSS
- **Media:** Pillow (image handling)

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/ZeyTrack/bookflow.git
cd bookflow

# 2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 3. Install dependencies
pip install django pillow six

# 4. Run migrations
python manage.py migrate

# 5. Start the development server
python manage.py runserver
```

Then open your browser and go to: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 👥 Team

Built with ❤️ by a team of 5 developers.
