from rest_framework import generics, status
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer, CreateEmployeeSerializer, EditEmployeeSerializer

######################
# Employee Endpoints #
######################

class EmployeeListView(generics.ListAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return Employee.objects.all()

class EmployeeDetailView(generics.RetrieveAPIView):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class CreateEmployeeView(generics.CreateAPIView):
    serializer_class = CreateEmployeeSerializer

    def perform_create(self, serializer):
        serializer.save()

class EditEmployeeView(generics.UpdateAPIView):
    serializer_class = EditEmployeeSerializer
    queryset = Employee.objects.all()

class DeleteEmployeeView(generics.GenericAPIView):
    serializer_class = EmployeeSerializer

    def delete(self, request, pk):
        employee = Employee.objects.get(pk=pk)
        employee.delete()
        return Response(status=status.HTTP_200_OK)


