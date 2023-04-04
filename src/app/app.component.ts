import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeeDetails';
  employeeDetails: any;
  isCheckedAll:boolean = false;
  employeeDetailsForm: FormGroup;
  formOperation: string = '';
  empId: number;
  arr: any = [];
  deptFieldValidation: boolean = true;
  searchValue: string;
  order: boolean = false;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) {
    this.getEmpDetails();
  }
  getEmpDetails() {
    this.empService.getEmployeeDetails().subscribe((res: any)=>{
       this.employeeDetails = res.employeeDetails;
    })
  }
  ngOnInit() {
    this.employeeDetailsForm = this.formBuilder.group({
        id: [{ value: '', disabled: false }, Validators.required],
        name: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z ]*$')]],
        department: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
        joining_date: ['', Validators.required],
        salary: ['', Validators.required]
    });
}
  selectDeselectRecord() {
      let filteredArr = this.employeeDetails.filter((emp: any) => emp.isChecked === true);
      if(filteredArr.length === this.employeeDetails.length) {
        this.isCheckedAll = true;
      }else {
        this.isCheckedAll = false;
      }
  }
  selectAllRecord(event: any) {
      this.employeeDetails.forEach((element: any,index: number)=>{
        if(event.currentTarget.checked == true) {
          element.isChecked = true;
        }else {
          element.isChecked = false;
        }
      })
  }
  deleteRowRecord(id: number) {
    let index = this.employeeDetails.findIndex((x: any) => x.id === id);
    this.employeeDetails.splice(index, 1)
  }
  deletedSelected() {
    this.arr = [];
    this.employeeDetails.forEach((element: any,index: number)=>{
     if(element.isChecked) {
       this.arr.push(element.id);
     }
   });

   for (let index of this.arr) {
    // look for the element by its id.
    const objId = this.employeeDetails.find((item:any) => item.id === index);
    // if it actually exists, splice it.
    objId && this.employeeDetails.splice(this.employeeDetails.indexOf(objId), 1);
  }
   

  //  this.employeeDetails
    //  for(let i = 0; i<=this.employeeDetails.length; i++) {
    //      if(this.employeeDetails[i].isChecked) {
    //       this.employeeDetails.splice(i, 1);
    //      }
    //  }
    //     this.employeeDetails
    
    // this.arr = this.employeeDetails.filter(function (el:any)
    //   {
    //    return el.isChecked !== true
    //   }
    // )
    // this.employeeDetails = this.arr;
  }
  addEmployee() {
    if (this.employeeDetailsForm.invalid) {
        alert('Invalid form details!')
        return;
    }else {
      if(this.formOperation === 'add-record') {
        this.employeeDetails.push(this.employeeDetailsForm.value)
      }
      if(this.formOperation === 'edit-record') {
          for(let i = 0; i<= this.employeeDetails.length; i++) {
             if(this.employeeDetails[i].id === this.empId) {
                this.employeeDetails[i].name = this.employeeDetailsForm.value.name;
                this.employeeDetails[i].department = this.employeeDetailsForm.value.department;
                this.employeeDetails[i].joining_date = this.employeeDetailsForm.value.joining_date;
                this.employeeDetails[i].salary = this.employeeDetailsForm.value.salary;
             }
          }
       }
    }

 }
 editRecord(emp: any) {
  this.formOperation = 'edit-record';
  this.deptFieldValidation = false;
  this.employeeDetailsForm.setValue({
    id: emp.id,
    name: emp.name,
    department: emp.department,
    joining_date: emp.joining_date,
    salary: emp.salary
  })
  this.employeeDetailsForm.get('id')?.disable()
 }
 openForm() {
  this.formOperation = 'add-record';
  this.employeeDetailsForm.get('id')?.enable();
  this.employeeDetailsForm.reset(); // reset
 }
 alphabeticalFirstChar(event: any) {
  let str = event.currentTarget.value;
  if(/^[A-z]+$/.test(str[0])) {
    this.deptFieldValidation = false;
    return true;
  }
  else{
    this.deptFieldValidation = true;
     return false;
  }
}

sortData(type: number) {
  var newArr;
  this.order = !this.order;
  switch(type) { 
    case 1: { 
      if(this.order){
          newArr = this.employeeDetails.sort((a: any ,b: any)=> a.id - b.id);
        } else {
          newArr = this.employeeDetails.sort((a: any ,b: any)=> b.id - a.id);
        }
       break; 
    } 
    case 2: { 
      if(this.order) {
       newArr = this.employeeDetails.sort((a: any, b: any) => (b.name > a.name) ? 1 : -1);
      }else {
        newArr = this.employeeDetails.sort((a: any, b: any) => (b.name < a.name) ? 1 : -1);
      }
       break; 
    } 
    default: { 
      if(this.order) {
        newArr = this.employeeDetails.sort((a: any, b: any) => (b.department > a.department) ? 1 : -1);
       }else {
         newArr = this.employeeDetails.sort((a: any, b: any) => (b.department < a.department) ? 1 : -1);
       }
       break; 
    } 
 } 
 this.employeeDetails = newArr;
}
  get f() { 
    return this.employeeDetailsForm.controls; 
  }
}
