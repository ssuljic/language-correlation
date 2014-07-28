from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'language_correlation.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'github.views.index', {'template': 'index.html'}, name='index'),
    url(r'^data$', 'github.views.data', name='data'),
)
