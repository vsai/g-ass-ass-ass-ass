#venmo tester

from flask import Flask, url_for, request, g, jsonify, abort, make_response, render_template
import json

app = Flask(__name__)
app.logger.setLevel('INFO')
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False

@app.route('/')
def hello_world():
	return "Hello World"

@app.route('/y')
def abc():
	return render_template('redirectHTML.html')

@app.route('/mkpay', methods=['POST'])
def make_payment():
	x = json.loads(request.data)
	return "YOLO"

def fake_make_charge():
	x = {}
	x['access_token'] = atoken
	x['phone'] = 2012146067 #mochi
	x['note'] = 'yolo'
	x['amount'] = -1 #charge
	

if __name__ == '__main__':
	app.run(debug=True)