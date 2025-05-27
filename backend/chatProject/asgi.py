# chatProject/asgi.py
import os
from channels.routing import get_default_application
from django.core.asgi import get_asgi_application
from .routing import application as channels_application
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatProject.settings')
django.setup()

# This is the Channels-enabled ASGI app
application = channels_application
