import { Pipe, PipeTransform } from '@angular/core';
import { Emp } from '../emp';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(employeeDetails : Emp[], searchValue: string): any {
    if(!employeeDetails || !searchValue) {
      return employeeDetails;
    }
    return employeeDetails.filter(emp=> 
         emp.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
         emp.department.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
         emp.id.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
     )
  }

}
