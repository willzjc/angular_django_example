from rest_framework import serializers
from ..authentication.serializers import AccountSerializer
from .models import Post


class SongSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    average_rating=serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'created_at', 'updated_at','average_rating')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_average_rating(self,obj):
        avg = obj.average_rating()
        return avg

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SongSerializer, self).get_validation_exclusions()
        return exclusions + ['author']