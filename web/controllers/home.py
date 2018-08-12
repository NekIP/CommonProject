from web.controllers.base import view
from web import app

@app.route('/')
@app.route('/index')
def index():
    return view('home')