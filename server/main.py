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


@app.route('/tasks', methods=['POST'])
def add_task():
    cur = mysql.connection.cursor()
    cur.execute('''
        INSERT INTO TASK
        VALUES (NULL, '%s', '%s', '%s', '', %s)
    ''' % (request.json['time'], request.json['title'], request.json['classId'], request.json['priority']))
    id = cur.lastrowid
    mysql.connection.commit()
    return {'data': id}


@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    cur = mysql.connection.cursor()
    cur.execute('''
        DELETE FROM TASK
        WHERE TASK_ID = %s
    ''' % task_id)
    id = cur.lastrowid
    mysql.connection.commit()
    return {'data': id}


@app.route('/classes', methods=['GET'])
def get_classes():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM CLASS''')
    rv = cur.fetchall()
    return {'classes': rv}


@app.route('/classes', methods=['POST'])
def add_class():
    print(request.json)
    cur = mysql.connection.cursor()
    cur.execute('''
        INSERT INTO CLASS
        VALUES ('%s', '%s')
    ''' % (request.json['name'], request.json['color']))
    mysql.connection.commit()
    return {}
