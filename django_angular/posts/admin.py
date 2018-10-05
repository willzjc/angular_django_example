from django.contrib import admin
from .models import Post,Rating

class SongAdmin(admin.ModelAdmin):
    search_fields = ('content', 'author__username', 'author__email')
    ordering = ('-updated_at',)
    list_display = ('content', 'author')

class RadingAdmin(admin.ModelAdmin):
    search_fields = ('rating','rating_author')
    ordering = ('-rating_author',)
    list_display = ('song', 'rating', 'rating_author')

admin.site.register(Post, SongAdmin)


admin.site.register(Rating, RadingAdmin)
