from django.urls import path
from api import views


urlpatterns = [
    path('user_registration', views.user_registration, name='user_registration'),
    path('user_login', views.user_login, name='user_login'),
    path('extract_business_card_details', views.extract_business_card_details, name='extract_business_card_details'),
    path('upload_cart_details', views.upload_cart_details, name='upload_cart_details'),
    path('get_cardDetails_by_user', views.get_cardDetails_by_user, name='get_cardDetails_by_user'),

]
