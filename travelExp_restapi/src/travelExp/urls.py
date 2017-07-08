from django.conf.urls import url,include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^userAuth/',include('userAuth.urls')),
    url(r'^wishList/',include('wishlist.urls')),
    url(r'^experience/',include('experience.urls'))
]
