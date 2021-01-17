from flask import Flask, request, send_from_directory
from flask_mysqldb import MySQL
app = Flask(__name__, static_folder='../my-app/build/static')

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'study_bot'

mysql = MySQL(app)


@app.route('/')
def index():
    return send_from_directory('../my-app/build', 'index.html')


@app.route('/tasks', methods=['GET'])
def get_tasks():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM TASK''')
    rv = cur.fetchall()
    return {'tasks': rv}


@app.route('/classes', methods=['GET'])
def get_classes():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM CLASS''')
    rv = cur.fetchall()
    return {'classes': rv}
