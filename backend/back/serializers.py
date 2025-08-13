from rest_framework import serializers
from .models import Ledgers, Staff, jobcard, joborder, processes, itemGrops,items,routes,departments,taxs,banks,hsn

class LedegerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledgers
        fields = ['id','ledger_codes','ledger_types','credits','balances','ledger_names']

class itemSerializer(serializers.ModelSerializer):
    class Meta:
        model = items
        fields = ['id','item_names','item_codes','HSNSAC_codes','sales_costs','units','taxs']


class itemGropSerializer(serializers.ModelSerializer):
    class Meta:
        model = itemGrops
        fields = ['id','item_categories','item_groups']

class taxSerializer(serializers.ModelSerializer):
    class Meta:
        model = taxs
        fields = ['id','tax_names','igsts']

class routeSerializer(serializers.ModelSerializer):
    class Meta:
          model = routes
          fields = ['id','route_names','departs','process','inhouse']

class processSerializer(serializers.ModelSerializer):
    class Meta:
        model = processes
        fields = ['id','process_name']

class departSerializer(serializers.ModelSerializer):
    class Meta:
        model = departments
        fields = ['id','dept_names']

class bankserializers(serializers.ModelSerializer):
    class Meta:
        model = banks
        fields = ['id','bank_names']

class hsnSerializer(serializers.ModelSerializer):
    class Meta:
        model = hsn
        fields = ['id','sac','taxs']

class joborderSerializer(serializers.ModelSerializer):
    class Meta:
        model = joborder
        fields = ['id','vendor_names','expected_dates', 'joborders', 'joborderDates', 'itemCodes', 'itemNames', 'processNames', 'qualities', 'rates', 'discounts', 'amount']

class jobcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobcard
        fields = ['id', 'route', 'jcards', 'jcds', 'itmcodes', 'itmnames', 'qtys', 'depts', 'pcss', 'huses']


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id',"Snames" ,"Scodes" ,"Divisions" ,"salarytypes" ,"worksHs"]