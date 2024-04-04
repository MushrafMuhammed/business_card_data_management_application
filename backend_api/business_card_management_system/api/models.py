from django.db import models

# Create your models here.

class CardDetails(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=50)
    website = models.URLField(max_length=254)
    profession = models.URLField(max_length=254)
    address = models.TextField(max_length=254)
    logo = models.ImageField(upload_to='card_logo/')

    class Meta:
        db_table = 'Card_details'


