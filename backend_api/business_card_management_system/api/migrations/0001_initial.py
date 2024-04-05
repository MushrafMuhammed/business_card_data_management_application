# Generated by Django 5.0.3 on 2024-04-05 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CardDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=20)),
                ('website', models.URLField()),
                ('profession', models.CharField(max_length=100)),
                ('address', models.TextField()),
                ('logo', models.ImageField(blank=True, null=True, upload_to='logos/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'Card_details',
            },
        ),
    ]
