
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

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

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get(environment.rootApi+"employees/")
      .subscribe({
        next: (res: any) => {
          this.employeeList = res
        error: () => {
          // implement error toast?
        }
      }});
  }
  
  editEmployee(any:any){
    // placeholder
  }

  deleteEmployee(any:any){
    // placeholder
  }

}
