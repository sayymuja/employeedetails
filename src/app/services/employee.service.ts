import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emp } from '../emp';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeDetails = [
    {
    id: 101,
    name: 'Sayyad Mujahid',
    department: 'Digital Advertising business',
    joining_date:'2022-11-24',
    salary: 1000,
    },
   {
     id: 102,
     name: 'Kiran Kumar',
     department: 'Data Mining',
     joining_date:'2022-11-24',
     salary: 2000,
   },
   {
     id: 103,
     name: 'Rathod',
     department: 'SEO business',
     joining_date:'2022-11-24',
     salary: 3000,
  },
  {
   id: 104,
   name: 'Amit Deshmukh',
   department: 'Web Designing Services',
   joining_date:'2022-11-24',
   salary: 3500,
   },
   {
   id: 105,
   name: 'Vijay Kumar',
   department: 'Digital Marketing Agency',
   joining_date:'2022-11-24',
   salary: 1000,
   }
   
]
  url: string = '/assets/empdb.json'
  constructor(private http: HttpClient) {
   }

   getEmployeeDetails() {
    return this.http.get<Emp[]>(this.url)
   }
}
