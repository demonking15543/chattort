"""
WSGI config for chatProject project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

# chatProject/asgi.py
import os
from django.core.asgi import get_asgi_application
from chat.routing import application as channels_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatProject.settings')

# Now use the combined ASGI app (with HTTP + WebSocket)
application = channels_application
