from django.db import models

# Create your models here.

class Ledgers(models.Model):
    ledger_codes = models.CharField(max_length=50)
    ledger_types = models.CharField(max_length=50)
    ledger_names = models.CharField(max_length=50)
    credits = models.CharField(max_length=100)
    balances = models.CharField(max_length=100)

    def __str__(self):
        return self.balances
    
class items(models.Model):
    item_names = models.CharField(max_length=100)
    item_codes = models.CharField(max_length=100,blank=True)
    HSNSAC_codes = models.CharField(max_length=100)
    sales_costs = models.CharField(max_length=100)
    units = models.CharField(max_length=50, blank=True)
    taxs = models.CharField(max_length=50, blank=True)
   
    def __str__(self):
        return self.sales_costs
    
class processes(models.Model):
    process_name = models.CharField(max_length=100)

    def __str__(self):
        return self.process_name
    
class departments(models.Model):
    dept_names = models.CharField(max_length=100)

    def __str__(self):
        return self.dept_names
    
class banks(models.Model):
    bank_names = models.CharField(max_length=100)

    def __str__(self):
        return self.bank_names
    
class itemGrops(models.Model):
    item_categories = models.CharField(max_length=100)
    item_groups = models.CharField(max_length=100)

    def __str__(self):
        return self.item_groups
    
class taxs(models.Model):
    tax_names = models.CharField(max_length=100)
    igsts = models.CharField(max_length=100)

    def __str__(self):
        return self.igsts
    
class routes(models.Model):
    route_names = models.CharField(max_length=100)
    departs = models.CharField(max_length=100)
    process = models.CharField(max_length=100,blank=True)
    inhouse = models.CharField(max_length=100,blank=True)

    def __str__(self):
        return self.departs

class hsn(models.Model):
    sac = models.CharField(max_length=100)
    taxs = models.CharField(max_length=100)

    def __str__(self):
        return self.sac

class joborder(models.Model):
    vendor_names = models.CharField(max_length=100)
    expected_dates = models.CharField(max_length=100)
    joborders = models.CharField(max_length=100)
    joborderDates = models.CharField(max_length=100)
    itemCodes = models.CharField(max_length=100)
    itemNames = models.CharField(max_length=100)
    processNames = models.CharField(max_length=100)
    qualities = models.CharField(max_length=100,default=0)
    rates = models.CharField(max_length=100)
    discounts = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)


    def __str__(self):
        return self.rates


class jobcard(models.Model):
    route = models.CharField(max_length=100)
    jcards = models.CharField(max_length=100)
    jcds = models.CharField(max_length=100)
    itmcodes = models.CharField(max_length=100)
    itmnames = models.CharField(max_length=100)
    qtys = models.CharField(max_length=100)
    depts = models.CharField(max_length=100)
    pcss = models.CharField(max_length=100)
    huses = models.CharField(max_length=100)

    def __str__(self):
        return self.route 

class Staff(models.Model):
    Snames = models.CharField(max_length=100)
    Scodes = models.CharField(max_length=100)
    Divisions = models.CharField(max_length=100)
    salarytypes = models.CharField(max_length=100)
    worksHs = models.CharField(max_length=100)

    def __str__(self):
        return self.Snames