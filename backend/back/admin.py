from django.contrib import admin
from .models import Ledgers, hsn, items, processes, departments, banks, itemGrops, taxs,routes, joborder,Staff
# Register your models here.
admin.site.register(Ledgers)
admin.site.register(items)
admin.site.register(processes)
admin.site.register(departments)
admin.site.register(banks)
admin.site.register(itemGrops)
admin.site.register(taxs)
admin.site.register(routes)
admin.site.register(hsn)
admin.site.register(joborder)
admin.site.register(Staff)
