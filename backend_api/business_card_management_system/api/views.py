from django.http import JsonResponse
from rest_framework.decorators import api_view
from api.serializers import CardDetailsSerializer
from business_card_management_system import settings
from .models import CardDetails, User
from django.core.files.storage import default_storage
from django.utils.text import slugify
import pytesseract
import cv2
import re
import os
from rest_framework import status

@api_view(['POST'])
def extract_business_card_details(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('card_img')

        if not uploaded_file:
            return JsonResponse({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        
        # Save the uploaded file to the media directory
        file_path = default_storage.save(uploaded_file.name, uploaded_file)

        # Construct the full file path
        full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)

        # Ensure the file is an image
        if not full_file_path.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return JsonResponse({'error': 'Uploaded file is not an image'}, status=status.HTTP_400_BAD_REQUEST)

        # Tesseract path
        pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_PATH
        
        # Read image
        img = cv2.imread(full_file_path)
        config = ('-l eng --oem 1 --psm 3')
        text = pytesseract.image_to_string(img, config=config)
        
        # Crop the right side of the image
        height, width, _ = img.shape
        cropped_img = img[:, width//2:]

        
        # Generate a unique name for the logo based on the uploaded file's name
        logo_name = slugify(uploaded_file.name.split('.')[0]) + '_logo.jpg'
        logo_path = os.path.join(settings.MEDIA_ROOT, logo_name)

        # Save the cropped image as the logo
        cv2.imwrite(logo_path, cropped_img)

        # Relative path to the saved logo for the response
        logo_url = os.path.join(settings.MEDIA_URL, logo_name)
        
        # Split text into lines
        lines = text.split('\n')

        # Initialize variables
        name = ''
        profession = ''
        email = ''
        phone = ''
        website = ''
        address = ''
        
        # Regular expression patterns for email,phone number and website detection
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
        website_pattern = r'\b(?:https?://)?(?:www\.)?([a-zA-Z0-9.-]+?\.[a-zA-Z]{2,})(?:/.*)?\b'

        # Iterate over each line in the text
        for line in lines:
            # Try to match email, phone number and website using regex
            if not email and re.search(email_pattern, line):
                email = re.search(email_pattern, line).group()
            elif not phone and re.search(phone_pattern, line):
                phone = re.search(phone_pattern, line).group()
            elif not website and re.search(website_pattern, line):
                website = re.search(website_pattern, line).group()
            else:
                # If not email or phone, website assume it's part of name, profession, or address
                if not name:
                    name = line.strip()
                elif not profession:
                    profession = line.strip()
                else:
                    # Assuming remaining lines are part of the address
                    address += line.strip() + ' '

        

        return JsonResponse({
            'message': 'Card data fetching completed',
            'card':full_file_path,
            'name': name,
            'profession': profession,
            'email': email,
            'phone': phone,
            'website': website,
            'address': address.strip(),  # Remove leading/trailing spaces
            'logo_path': logo_url  # Path to the saved logo image
        }, status=status.HTTP_200_OK)
    return JsonResponse({'error':'Method not found'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def upload_cart_details(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        profession = request.POST.get('profession')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        website = request.POST.get('website')
        address = request.POST.get('address')
        logo = request.POST.get('logo')

        # Check if any of the required fields is None or empty
        if None in [name, profession, email, phone, website, address, logo] or '' in [name, profession, email, phone, website, address, logo]:
            return JsonResponse({'error': 'One or more required fields are missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            card_details = CardDetails.objects.create(
                user_id=1,
                name=name,
                profession=profession,
                email=email,
                phone_number=phone,
                website=website,
                address=address,
                logo=logo
            )
            return JsonResponse({'success': 'Data inserted successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def get_cardDetails_by_user(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id')

        if not user_id:
            return JsonResponse({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            Card_details = CardDetails.objects.filter(user_id=user_id)
            serializer_data = CardDetailsSerializer(Card_details, many=True)
            return JsonResponse({'success':serializer_data.data})
        except Exception as e:
            # Handle data sending failure
            return JsonResponse({'error': f'Failed to send data: {e}'}, status=500)

    return JsonResponse({'error':'Mothod not found'})