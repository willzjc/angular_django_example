from rest_framework import permissions, viewsets
from rest_framework.response import Response
from .models import Post
from .permissions import IsAuthorOfPost
from .serializers import SongSerializer


class SongViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = SongSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return permissions.AllowAny(),
        return permissions.IsAuthenticated(), IsAuthorOfPost(),

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super(SongViewSet, self).perform_create(serializer)


class AccountPostsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('author').all()
    serializer_class = SongSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        print 'queryset',queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class PostRatingsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('rating_author').all()
    serializer_class = SongSerializer

    def list(self, request, post_id=None):
        queryset = self.queryset.filter(post_id__rating=post_id)
        print 'queryset',queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)