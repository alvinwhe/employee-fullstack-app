
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormModalComponent } from 'src/app/employee-form-modal/employee-form-modal.component';

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
  displayedColumns: string[] = ['firstName', 'lastName', 'salary', 'edit', 'delete'];
  
  constructor(
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
      error: () => {
        // implement error toast?
      }
    }});
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
              // implement success toast?
            error: () => {
              // implement error toast?
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
              // implement success toast?
            error: () => {
              // implement error toast?
            }
          }});
      }
    });
  }

  public deleteEmployee(any:any){
    // placeholder
  }

}
