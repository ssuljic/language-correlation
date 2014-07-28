from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext
from django.http import QueryDict
import json
import csv

def index(request, template):
	languages = []
	
	data = csv.reader(
		open('languagecorrelation/static/languages.csv', 'rb'), 
		delimiter=','
	);

	for row in data:
		languages.append(row[0])

	return render_to_response(
		'index.html',
		{
		'languages': languages
		},
		context_instance=RequestContext(request)
	)

def data(request):
	selected_language = request.GET.get('lang', 'ASP')
	print selected_language
	languages_correaltion = {}
	languages_correaltion['name'] = 'data'
	languages_correaltion['children'] = []
	
	data = csv.reader(
		open('languagecorrelation/static/language_correlation.csv', 'rb'), 
		delimiter=','
	);

	for row in data:
		if row[1] == selected_language:
			correlation = {}
			correlation['name'] = row[2]
			correlation['size'] = row[0]
			languages_correaltion['children'].append(correlation)

	return HttpResponse(json.dumps(languages_correaltion, indent=4), 'application/json')