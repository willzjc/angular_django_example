from django.contrib import admin
from .models import Post,Rating

class SongAdmin(admin.ModelAdmin):
    search_fields = ('content', 'author__username', 'author__email')
    ordering = ('-updated_at',)
    list_display = ('content', 'author')

class RatingAdmin(admin.ModelAdmin):
    search_fields = ('rating','post_id__rating_author','post_id__rating')
    ordering = ('-rating_author',)
    list_display = ('song', 'rating', 'rating_author')

admin.site.register(Post, SongAdmin)


admin.site.register(Rating, RatingAdmin)
