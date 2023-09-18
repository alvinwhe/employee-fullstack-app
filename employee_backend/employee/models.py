from django.db import models

# Create your models here.
class Employee(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=15, decimal_places=2)