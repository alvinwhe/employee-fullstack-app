from employee.views import EmployeeListView, CreateEmployeeView, DeleteEmployeeView, EmployeeDetailView, EditEmployeeView
from django.urls import path

urlpatterns = [
    path('', EmployeeListView.as_view(), name='employees'),
    path('create/', CreateEmployeeView.as_view(), name='create_employee'),
    path('<int:pk>/', EmployeeDetailView.as_view(), name='employee_detail'),
    path('<int:pk>/edit/', EditEmployeeView.as_view(), name='edit_employee'),
    path('<int:pk>/delete/', DeleteEmployeeView.as_view(), name='delete_employee'),
]