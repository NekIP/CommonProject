from flask import Flask
import os

viewsPath = os.path.abspath('web/wwwroot/views')
app = Flask(__name__, template_folder = viewsPath)

from web.controllers import home