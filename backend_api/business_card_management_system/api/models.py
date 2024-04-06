from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

    class Meta:
        db_table = 'User'

class CardDetails(models.Model):
    user = models.ForeignKey('api.User', on_delete=models.CASCADE, null=True, blank=True, default='0')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    website = models.URLField()
    profession = models.CharField(max_length=100)
    address = models.TextField()
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Card_details'
