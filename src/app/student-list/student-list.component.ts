import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
interface studentInterface {
  name: string;
  id: string;
  phone: number;
  email: string;
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule
  ]
})
export class StudentListComponent {
  dataSource:Array<studentInterface>
  displayedColumns: string[] = ['id','name', 'email', 'number','action'];
  row="-1"
  constructor(private router:Router)
  {
    this.getStudents();

  }
  async getStudents(){
    const response=await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students`);
    this.dataSource=await response.json();
    console.log(this.dataSource);
    console.log(this.dataSource[0].name)
  }

  async deleteItem(id:string)
  {

    this.row=id
    let response=await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students/${id}`, {
      method: "DELETE"
    });
    const data=await response.json();
    response=await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students`);
    this.dataSource=await response.json();
  }
  edit(id: string) {
    this.router.navigate(["edit", id]);
  }
  view(id:string)
  {
    this.router.navigate(["attendance-record", id]);   
  }
}
