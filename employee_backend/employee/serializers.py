from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
    
class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'salary')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'salary': {'required': True},
        }

class EditEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'salary')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'salary': {'required': False},
        }

