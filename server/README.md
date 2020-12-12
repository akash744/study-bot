Assumption:
- Run on Windows
- Python 3 and Python Launcher is installed.
- Commands are run with Powershell

`py -3 -m venv venv` run this once to create a virtual environment
`venv\Scripts\activate` run this every time you want to run the project
`pip install Flask` run this once to install Flask
`cd my-app; npm run build; cd ../; $env:FLASK_APP = "./server/main.py"; $env:FLASK_ENV = "development"; flask run` this command build the client and serve it through Flask

A mock up login service is included in the server. Run this on the client to test:
```
const response = await fetch('/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'user', password: 'password'})
});
console.log(response.json());
```
