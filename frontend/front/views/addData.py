from django.shortcuts import redirect, render
import requests
from django.contrib import messages

def item(request):
    if request.method == "POST":
       data={
           'item_codes':request.POST.get('Icode'),
           'item_names':request.POST.get('Iname'),
           'HSNSAC_codes':request.POST.get('hsc'),
           'sales_costs':request.POST.get('salesrate'),
           'units':request.POST.get('unit'),
           'taxs':request.POST.get('tax')
       } 
       response = requests.post(url='http://127.0.0.1:8000/item/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('item')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request,'item.html')

def ledger(request):
    if request.method == "POST":
       data={
           'ledger_codes':request.POST.get('lcode'),
           'ledger_types':request.POST.get('ltype'),
           'ledger_names':request.POST.get('lname'),
           'credits':request.POST.get('credit_limit'),
           'balances':request.POST.get('balance'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/ledger/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('ledger')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'Ledger.html')

def route(request):
    if request.method == "POST":
       data={
           'route_names':request.POST.get('rname'),
           'departs':request.POST.get('department'),
           'process':request.POST.get('Process'),
           'inhouse':request.POST.get('ihose')
       } 
       print(data)
       response = requests.post(url='http://127.0.0.1:8000/rout/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('route')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'route.html')

def itmgrp(request):
    if request.method == "POST":
       data={
           'item_categories':request.POST.get('itemcategory'),
           'item_groups':request.POST.get('temgrp'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/itemgrp/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('itmgrp')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'itemGrp.html')

def process(request):
    if request.method == "POST":
       data={
           'process_name':request.POST.get('process'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/process/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('process')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'process.html')

def tax(request):
    if request.method == "POST":
       data={
           'tax_names':request.POST.get('taxname'),
           'igsts':request.POST.get('igst'),
           'cgsts':request.POST.get('cgst'),
           'sgsts':request.POST.get('sgst'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/tax/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('tax')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'tax.html')

def dept(request):
    if request.method == "POST":
       data={
           'dept_names':request.POST.get('deptname'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/dept/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('dept')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'depart.html')

def bank(request):
    if request.method == "POST":
       data={
           'bank_names':request.POST.get('bankname'),
       } 
       response = requests.post(url='http://127.0.0.1:8000/bank/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('bank')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'bank.html')

def sac(request):
    if request.method == "POST":
       data={
           'sac':request.POST.get('sac'),
           'taxs':request.POST.get('tax'),
       } 
       print(data)
       response = requests.post(url='http://127.0.0.1:8000/sac/', data=data)
       if response.status_code == 201:
           messages.success(request,"Saved")
           return redirect('sac')
       else:
           messages.error(request,'Failed to save')
       print(response)
    return render(request, 'HSNSAC.html')