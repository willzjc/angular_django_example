from django.db import models
from django_angular.authentication.models import Account


class Post(models.Model):

    RATING_CHOICES = (
        tuple((i, str(i)) for i in range(-1, 100))
    )
    author = models.ForeignKey(Account)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(choices=RATING_CHOICES,default=-1)

    def __unicode__(self):
        return '{0}'.format(self.content)