# 📈 Stock Data Viewer (Bhavcopy Based)

A full-stack web application that extracts stock market data from **Bhavcopy files** and displays it on a user-friendly frontend interface.
The backend processes and stores the extracted stock data, while the frontend allows users to view the information interactively.

---

## 🚀 Features

* 📊 Extract stock market data from **Bhavcopy files**
* 🔍 Display stock details on a dynamic frontend
* ⚡ Fast frontend built with **React + Vite**
* 🔗 Backend API built with **Django**
* 💾 Data stored and managed using **SQLite**

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Django
* Python

### Database

* SQLite

---

## 📂 Project Structure

```
stock-data
│
├── backend
│   ├── assignment
│   ├── stocks
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend
│   ├── public
│   ├── src
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akriti04gupta/stock-data.git
cd stock-data
```

---

## ▶️ Run Backend (Django)

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install django
```

Run migrations:

```bash
python manage.py migrate
```

Start the backend server:

```bash
python manage.py runserver
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## ▶️ Run Frontend (React + Vite)

Open another terminal and navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 How It Works

1. Bhavcopy stock data file is processed in the **Django backend**.
2. Relevant stock information is extracted and stored in the database.
3. The backend exposes APIs to provide this data.
4. The **React frontend** fetches the data through APIs.
5. Stock data is displayed to users in an interactive interface.

---

## 📌 Future Improvements

* Add stock price visualization charts
* Enable filtering and searching of stocks
* Integrate real-time stock market APIs
* Deploy the application

---

## 👩‍💻 Author

**Akriti Gupta**

BTech IT (AI & ML)
Full Stack Developer | Machine Learning Enthusiast
