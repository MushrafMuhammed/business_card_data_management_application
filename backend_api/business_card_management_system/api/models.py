from django.db import models

# Create your models here.

class CardDetails(models.Model):
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
