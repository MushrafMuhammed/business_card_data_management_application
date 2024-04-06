from rest_framework import serializers

from .models import User,CardDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'

class CardDetailsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CardDetails
        fields = '__all__'