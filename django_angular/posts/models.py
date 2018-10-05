from django.db import models
from django_angular.authentication.models import Account
import numpy as np

class Post(models.Model):


    author = models.ForeignKey(Account)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def average_rating(self):
        all_ratings = map(lambda x: x.rating, self.rating_set.all())
        avg=np.mean(all_ratings)
        print avg
        return avg

    def __unicode__(self):
        return '{0}'.format(self.content)

class Rating(models.Model):

    rating_author = models.ForeignKey(Account)
    song = models.ForeignKey(Post)
    RATING_CHOICES = (
        tuple((i, str(i)) for i in range(-1, 101))
    )

    RATING_CHOICES.__add__(tuple((None,'Make a selection')))
    rating = models.IntegerField(choices=RATING_CHOICES,default=None,null=True,blank=True)
