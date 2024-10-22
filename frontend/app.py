from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = "supersecretkey"

API_AUTH = "http://auth_service:5000"  # Aquí es donde estará corriendo el microservicio de autenticación

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        
        # Llamada al microservicio de autenticación para registrar al usuario
        response = requests.post(f"{API_AUTH}/register", json={"username": username, "password": password, "email": email})
        
        if response.status_code == 200:
            flash("Registro exitoso!", "success")
            return redirect(url_for('index'))
        else:
            flash("El registro falló. Inténtalo de nuevo.", "danger")
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Llamada al microservicio de autenticación para iniciar sesión
        response = requests.post(f"{API_AUTH}/login", json={"username": username, "password": password})
        
        if response.status_code == 200:
            flash("Inicio de sesión exitoso!", "success")
            return redirect(url_for('index'))
        else:
            flash("Inicio de sesión fallido. Inténtalo de nuevo.", "danger")
    
    return render_template('login.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
