from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import LedegerSerializer, StaffSerializer, hsnSerializer,itemSerializer,itemGropSerializer, jobcardSerializer, joborderSerializer, processSerializer, departSerializer, bankserializers, taxSerializer, routeSerializer
from .models import Ledgers, Staff, hsn,items, itemGrops, jobcard, joborder, processes, departments, banks,taxs,routes
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from rest_framework import status
# Create your views here.


class ledgerView(APIView):
    def get(self,request):
        ledgers = Ledgers.objects.all()
        serializer = LedegerSerializer(ledgers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = LedegerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ledgerDetail(APIView):
    def get_object(self,pk):
        try:
            return  Ledgers.objects.get(pk=pk)
        except Ledgers.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        Ledger = self.get_object(pk)
        serializer = LedegerSerializer(Ledger)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        ledger =  self.get_object(pk)
        serializer = LedegerSerializer(ledger, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        ledger = self.get_object(pk)
        ledger.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class itemView(APIView):
    def get(self,request):
        itms = items.objects.all()
        serializer = itemSerializer(itms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = itemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class itemDetail(APIView):
    def get_object(self,pk):
        try:
          return items.objects.get(pk=pk)
        except items.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        itm = self.get_object(pk)
        serializer = itemSerializer(itm)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        itm = self.get_object(pk)
        serializer = itemSerializer(itm, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        itm = self.get_object(pk)
        itm.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class itemGrpView(APIView):
      def get(self,request):
          itmgrps = itemGrops.objects.all()
          serializer = itemGropSerializer(itmgrps, many=True)
          return Response(serializer.data, status=status.HTTP_200_OK)
      
      def post(self,request):
        serializer = itemGropSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return render(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
    
class itemGrpDetail(APIView):
    def get_object(self,pk):
        try:
            return itemGrops.objects.get(pk=pk)
        except itemGrops.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        itmgrp = self.get_object(pk)
        serializer = itemGropSerializer(itmgrp)
        return render(serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        itmgrp = self.get_object(pk)
        serializer = itemGropSerializer(itmgrp,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        itmgrp = self.get_object(pk)
        itmgrp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class processView(APIView):
    def get(self,request):
        process = processes.objects.all()
        serializer = processSerializer(process, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
         serilalizer = processSerializer(data=request.data)
         if serilalizer.is_valid():
             serilalizer.save()
             return Response(serilalizer.data, status=status.HTTP_201_CREATED)
         print(serilalizer.errors)
         return Response(serilalizer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class processDetail(APIView):
    def get_object(self,pk):
        try:
            return processes.objects.get(pk=pk)
        except processes.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        process = self.get_object(pk)
        serializer = processSerializer(process)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        process =  self.get_object(pk)
        serializer = processSerializer(process, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        process = self.get_object(pk)
        process.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class deptView(APIView):
    def get(self,request):
        depts = departments.objects.all()
        serializer = departSerializer(depts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = departSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class deptDetail(APIView):
    def get_object(self,pk):
        try:
            return  departments.objects.get(pk=pk)
        except departments.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        dept = self.get_object(pk)
        serializer = departSerializer(dept)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        dept =  self.get_object(pk)
        serializer = departSerializer(dept, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        dept = self.get_object(pk)
        dept.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class bankView(APIView):
    def get(self,request):
        bank = banks.objects.all()
        serializer = bankserializers(bank, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = bankserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class bankDetail(APIView):
    def get_object(self,pk):
        try:
            return  banks.objects.get(pk=pk)
        except banks.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        bank = self.get_object(pk)
        serializer = bankserializers(bank)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        bank =  self.get_object(pk)
        serializer = bankserializers(bank, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        bank = self.get_object(pk)
        bank.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class taxView(APIView):
    def get(self,request):
        tax = taxs.objects.all()
        serializer = taxSerializer(tax, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = taxSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class taxDetail(APIView):
    def get_object(self,pk):
        try:
            return  taxs.objects.get(pk=pk)
        except taxs.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        tax = self.get_object(pk)
        serializer = taxSerializer(tax)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        tax =  self.get_object(pk)
        serializer = taxSerializer(tax, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        tax = self.get_object(pk)
        tax.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class routsView(APIView):
    def get(self,request):
        routs = routes.objects.all()
        serializer = routeSerializer(routs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = routeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class routDetail(APIView):
    def get_object(self,pk):
        try:
            return  routes.objects.get(pk=pk)
        except routes.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        rout = self.get_object(pk)
        serializer = routeSerializer(rout)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        rout =  self.get_object(pk)
        serializer = LedegerSerializer(rout, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        rout = self.get_object(pk)
        rout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
def generate_item_code(request):
    if request.method == "GET":
        last_item = items.objects.order_by('-id').first()  # Get the last item
        print(last_item)
        print(last_item.item_codes)
        if last_item and last_item.item_codes:  # Ensure last_code is not None or empty
            last_code = last_item.item_codes.strip()  # Remove any unwanted spaces
            
            if last_code.startswith("ITM") and last_code[3:].isdigit():  # Ensure proper format
                last_number = int(last_code[3:])  # Extract number
                new_code = f"ITM{last_number + 1:05d}"  # Generate new code
            else:
                new_code = "ITM00001"  # Reset if the format is incorrect
        else:
            new_code = "ITM00001"  # Default for first item or empty code
        
        return JsonResponse({"item_code": new_code})
    
class sacView(APIView):
    def get(self,request):
        routs = hsn.objects.all()
        serializer = hsnSerializer(routs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = hsnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class sacDetail(APIView):
    def get_object(self,pk):
        try:
            return  hsn.objects.get(pk=pk)
        except hsn.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        sac = self.get_object(pk)
        serializer = hsnSerializer(sac)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        sac =  self.get_object(pk)
        serializer = hsnSerializer(sac, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        sac = self.get_object(pk)
        sac.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class JOView(APIView):
    def get(self,request):
        routs = joborder.objects.all()
        serializer = joborderSerializer(routs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = joborderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class JODetail(APIView):
    def get_object(self,pk):
        try:
            return  joborder.objects.get(pk=pk)
        except joborder.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        jo = self.get_object(pk)
        serializer = joborderSerializer(jo)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        jo =  self.get_object(pk)
        serializer = joborderSerializer(jo, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        jo = self.get_object(pk)
        jo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
def generate_order_no(request):
    if request.method == "GET":
        last_item = joborder.objects.order_by('-id').first()  # Get the last item

        if last_item and last_item.joborders:  # Ensure last_code is not None or empty
            last_code = last_item.joborders.strip()  # Remove any unwanted spaces
            
            if last_code.startswith("JO") and last_code[3:].isdigit():  # Ensure proper format
                last_number = int(last_code[3:])  # Extract number
                new_code = f"JO{last_number + 1:05d}"  # Generate new code
            else:
                new_code = "JO00001"  # Reset if the format is incorrect
        else:
            new_code = "JO00001"  # Default for first item or empty code
        
        return JsonResponse({"order_no": new_code})
    
def card(request):
        if request.method == "GET":
            last_item = jobcard.objects.order_by('-id').first()  # Get the last item

            if last_item and last_item.jcards:  # Ensure last_code is not None or empty
                last_code = last_item.jcards.strip()  # Remove any unwanted spaces
                
                if last_code.startswith("JC") and last_code[3:].isdigit():  # Ensure proper format
                    last_number = int(last_code[3:])  # Extract number
                    new_code = f"JC{last_number + 1:05d}"  # Generate new code
                else:
                    new_code = "JC00001"  # Reset if the format is incorrect
            else:
                new_code = "JC00001"  # Default for first item or empty code
            
            return JsonResponse({"card_no": new_code})
   
class JcardView(APIView):
    def get(self,request):
        cards = jobcard.objects.all()
        serializer = jobcardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = jobcardSerializer(partial=True ,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class jcardDetail(APIView):
    def get_object(self,pk):
        try:
            return  jobcard.objects.get(pk=pk)
        except jobcard.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        card = self.get_object(pk)
        serializer = jobcardSerializer(card)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        card =  self.get_object(pk)
        serializer = jobcardSerializer(card, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        card = self.get_object(pk)
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 


class StaffView(APIView):
    def get(self,request):
        staffs = Staff.objects.all()
        serializer = StaffSerializer(staffs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class StaffDetail(APIView):
    def get_object(self,pk):
        try:
            return Staff.objects.get(pk=pk)
        except Staff.DoesNotExist:
            raise Http404
        
    def get(self,request,pk):
        staff = self.get_object(pk)
        serializer = StaffSerializer(staff)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,pk):
        staff = self.get_object(pk)
        serializer = StaffSerializer( staff, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,pk):
        staff = self.get_object(pk)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)