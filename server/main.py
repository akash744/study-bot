from flask import Flask, request, send_from_directory
app = Flask(__name__, static_folder='../my-app/build/static')

@app.route('/')
def index():
    return send_from_directory('../my-app/build', 'index.html')

@app.route('/signin', methods=['POST'])
def signin():
    username = request.json.get('username', '')
    password = request.json.get('password', '')

    if (username == 'user' and password == 'password'):
        return {
            'is_success': True,
            'token': 'token'
        }
    else:
        return {
            'is_success': False,
            'token': ''
        }
