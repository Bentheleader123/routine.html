# app.py

from flask import Flask, render_template, request, redirect, session
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # Set a secret key for session encryption

# Database connection
conn = sqlite3.connect('database.db')
conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Fetch user from database
        cursor = conn.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()

        if user is not None:
            stored_password = user[3]
            # Check if the entered password matches the stored password (using hashlib.sha256 for password hashing)
            if hashlib.sha256(password.encode()).hexdigest() == stored_password:
                # Set user session
                session['user_id'] = user[0]
                session['username'] = user[1]
                return redirect('/dashboard')
        
        # Invalid credentials, show error message
        error = "Invalid username or password"
        return render_template('login.html', error=error)
        
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check if username or email already exists
        cursor = conn.execute("SELECT * FROM users WHERE username = ? OR email = ?", (username, email))
        existing_user = cursor.fetchone()

        if existing_user is not None:
            error = "Username or email already exists"
            return render_template('signup.html', error=error)

        # Insert new user into the database (using hashlib.sha256 for password hashing)
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        conn.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, hashed_password))
        conn.commit()

        # Redirect to login page
        return redirect('/login')

    return render_template('signup.html')


@app.route('/dashboard')
def dashboard():
    # Check if user is logged in (session check)
    if 'user_id' in session:
        return render_template('dashboard.html', username=session['username'])

    # Redirect to login page if user is not logged in
    return redirect('/login')


@app.route('/logout')
def logout():
    # Clear user session
    session.clear()
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Perform server-side validation and authentication logic
    # Check the provided username and password against the database or any other validation method

    # Example response based on validation/authentication result
    if valid_login:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    # Perform server-side validation and sign-up logic
    # Store the new user's information in the database or any other appropriate actions

    # Example response based on sign-up result
    if successful_signup:
        return jsonify({'message': 'Sign-up successful'})
    else:
        return jsonify({'message': 'Error occurred during sign-up'}), 500

if __name__ == '__main__':
    app.run()
# Server-side code (Python with Flask)
@app.route('/verify-email/<token>')
def verify_email(token):
    # Verify the token and mark the user's email as verified
    # Redirect the user to a success page or display a message
