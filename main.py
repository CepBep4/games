from flask import Flask, render_template

app = Flask(__name__, template_folder='chessgame/dist', static_folder='chessgame/dist/assets')

@app.route('/')
def home():
    return render_template('choice.html')

@app.route('/chess')
def chess():
    return render_template('index.html')