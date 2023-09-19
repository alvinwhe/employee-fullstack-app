import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form-modal',
  templateUrl: './employee-form-modal.component.html',
  styleUrls: ['./employee-form-modal.component.scss']
})
export class EmployeeFormModalComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // All fields are required
      // Salary validates all numbers up to two decimal place up to 1 trillion
      this.form = this.formBuilder.group({
        firstName: [data.first_name, Validators.required],
        lastName: [data.last_name, Validators.required],
        salary: [data.salary, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"),Validators.maxLength(15)]],
      });
    }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}