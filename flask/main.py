from flask import Flask, jsonify, request, send_file
from question_gen import qs

datafile = 'data.txt'
app = Flask(__name__)

@app.route('/vocab')
def get_links():
    id = max(min(int(request.args.get('id')), 4), 0)
    return {"questions": qs[id]}

@app.route('/data', methods=['GET', 'POST'])
def post_data():
    content = request.get_json()
    print(content)
    delim = '---'
    time = str(content['time'])
    dt = str(content['delta_time'])
    question = str(content['question'])
    label = str(content['label'])
    answer = str(content['answer'])
    with open(datafile, 'a') as outfile:
        outfile.write(time+delim+question+delim+answer+delim+label+delim+dt+'\n')
    return {"ok":"ok"}

@app.route('/analytics123456789')
def get_data():
    return send_file(datafile)

@app.route('/analytics_clearLoZiNkA')
def clear_data():
    with open(datafile, 'w') as outfile:
        outfile.write("")
    return send_file(datafile)

print(qs)
app.run(host='0.0.0.0') 