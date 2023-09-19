
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { EmployeeFormModalComponent } from 'src/app/employee-form-modal/employee-form-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;
}

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})

export class EmployeeTableComponent {
  employeeList: Employee [] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'salary', 'icons'];
  employeePage: Employee [] = [];

  // For first and last employee on the page
  firstEmployee: number = 0;
  lastEmployee: number = 10;

  constructor(
    private notification: MatSnackBar,
    private http: HttpClient,
    private dialog: MatDialog
    ) {}

  ngOnInit(){
    this.getEmployees();
  }

  private getEmployees() {
    this.http.get(environment.rootApi+"employees/")
    .subscribe({
      next: (res: any) => {
        this.employeeList = res
        this.getPage();
      error: () => {
        this.showError();
      }
    }});
  }
  
  private getPage() {
    this.employeePage = this.employeeList.slice(this.firstEmployee, this.lastEmployee);
  }

  public updatePage(event: PageEvent) {
    // Calculates page from employee indices
    this.firstEmployee = event.pageIndex * event.pageSize;
    this.lastEmployee = this.firstEmployee + event.pageSize;
    this.getPage();
  }

  public addEmployee() {
    const addDialogRef = this.dialog.open(EmployeeFormModalComponent, {
      restoreFocus: false,
      data: {
        action: "Add"
      }
    })

    addDialogRef.afterClosed().subscribe(result => {
      if (result) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.post(environment.rootApi+"employees/create/", 
          {
            first_name: result.firstName,
            last_name: result.lastName,
            salary: result.salary
          },
          { 
            headers: headers
          }).subscribe({
            next: (res: any) => {
              this.getEmployees();
              this.showSuccess();
            error: () => {
              this.showError();
            }
          }});
      } 
    });
  }

  public editEmployee(employee: any){
    const editDialogRef = this.dialog.open(EmployeeFormModalComponent, {
      restoreFocus: false,
      data: {
        action: "Edit",
        ...employee
      }
    })

    editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.put(environment.rootApi+`employees/${employee.id}/edit/`, 
          {
            first_name: result.firstName,
            last_name: result.lastName,
            salary: result.salary
          },
          { 
            headers: headers
          }).subscribe({
            next: (res: any) => {
              this.getEmployees();
              this.showSuccess();
            error: () => {
              this.showError();
            }
          }});
      }
    });
  }

  public deleteEmployee(employee: any){
    const deleteDialogRef = this.dialog.open(DeleteModalComponent, {
      restoreFocus: false,
      data: {
        type: "Employee",
        value: `${employee.first_name} ${employee.last_name}`,
      }
    })

    deleteDialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.delete(environment.rootApi+`employees/${employee.id}/delete/`)
          .subscribe({
            next: (res: any) => {
              this.getEmployees();
              this.showSuccess()
            error: () => {
              this.showError();
            }
          }});
      } 
    });
  }

  private showError() {
    this.notification.open("Error", undefined, {
      duration: 3000
    });
  }

  private showSuccess() {
    this.notification.open("Success", undefined, {
      duration: 3000
    });
  }
}
