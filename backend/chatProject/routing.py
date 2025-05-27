# chatProject/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing  # your app's websocket routing

application = ProtocolTypeRouter({
    "http": URLRouter([]),  # optional: you can omit this
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
