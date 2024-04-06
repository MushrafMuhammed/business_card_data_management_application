from rest_framework import serializers

from .models import CardDetails

class CardDetailsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CardDetails
        fields = '__all__'