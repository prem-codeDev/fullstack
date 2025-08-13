from django.shortcuts import render, redirect
from django.contrib import messages
import requests
import json


def jorder(request):
    if request.method == "POST":
       data={
           'vendor_names':request.POST.get('vendorname'),
           'expected_dates':request.POST.get('Edate'),
           'joborders':request.POST.get('JON'),
           'joborderDates':request.POST.get('JOD'),
           'itemCodes':request.POST.get('itmcode'),
           'item_names':request.POST.get('itmName'),
           'processNames':request.POST.get('pname'),
           'qualities':request.POST.get('qty'),
           'rates':request.POST.get('itmRate'),
           'discounts':request.POST.get('dist'),
           'amount':request.POST.get('amount')
       } 
       print(data)
       response = requests.post(url='http://127.0.0.1:8000/jo/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
       else:
           messages.error(request,'Failed to save')
       print(response)

    return render(request,'joborder.html')

def jobcard(request):
    if request.method == "POST":
       product_data_json = request.POST.get('productData')
       try:
            product_data = json.loads(product_data_json) if product_data_json else []
       except json.JSONDecodeError:
            product_data = []
       data={
           'route':request.POST.get('route'),
           'jcards':request.POST.get('JCN'),
           'jcds':request.POST.get('jcd'),
           'itmcodes':request.POST.get('itmcode'),
           'itmnames':request.POST.get('itmName'),
           'products': json.dumps(product_data),
           'qtys':request.POST.get('qty'),
           'depts':request.POST.get('department'),
           'pcss':request.POST.get('process'),
           'huses':request.POST.get('house'),
       } 
       print(data)
       response = requests.post(url='http://127.0.0.1:8000/jcard/', data=data)
       print(data)
       if response.status_code == 201:
           messages.success(request,"Saved")
       else:
           messages.error(request,'Failed to save')
       print(response)

    return render(request,'jobcard.html')

def staff(request):
    return render(request,'Staff.html')

def stafflist(request):
    return  render(request,'staffList.html')