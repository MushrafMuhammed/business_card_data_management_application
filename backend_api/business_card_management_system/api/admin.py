from django.contrib import admin

from .models import User, CardDetails

# Register your models here.
admin.site.register(User)
admin.site.register(CardDetails)

