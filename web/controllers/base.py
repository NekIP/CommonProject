import flask

def view(name : str):
    """
    Render view(template) by name
    """
    correctedName = name if ('.html' in name) else (name + '.html')
    return flask.render_template(correctedName)