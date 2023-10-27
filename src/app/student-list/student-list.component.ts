import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
interface studentInterface {
  name: string;
  id: string;
  phone: number;
  email: string;
}
interface attRecord {
  date: string,
  pid: Array<string>
  id: string
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
  ]
})
export class StudentListComponent {

  dataSource: Array<studentInterface>
  displayedColumns: string[] = ['id', 'name', 'email', 'number', 'action'];
  row = "-1";
  recordData: Array<attRecord>
  pageSize: number = 10;

  constructor(private router: Router) {
    this.getStudents();

  }
  async getStudents() {
    const response = await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students`);
    this.dataSource = await response.json();

  }

  async deleteItem(id: string) {
    this.row = id
    let response = await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    response = await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/students`);
    this.dataSource = await response.json();


    //We are trying to delete the attendance record of the student from record storage
    let recordResponse=await fetch('https://6537e9dfa543859d1bb10641.mockapi.io/record')
    this.recordData=await recordResponse.json();

    this.recordData.forEach(async (i)=>{ //Iterating through each obj of 'record'.
      let recordObj=i.pid.find((j)=>j===id)//Checking whether pid of that particular obj contains the 'id' which are going to delete
      if(recordObj===undefined)
      {
        //If recordObj is undefined it means id is not present in obj's pid. We can move ahead and check for other obj's of 'record'.
      }
      else
      {
        const filteredPid = i.pid.filter((x) => x !== id) //Creating on filteredPid which does not contain 'id' which is going to be deleted

        let UpdatedObj:attRecord={
          date:i.date,
          id:i.id,
          pid:[...filteredPid]
        }

        if(filteredPid.length===0){ //If length of filtered pid is 0 then there is no point of keeping that obj.
          let r=await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/record/${i.id}`, {
            method: "DELETE",
          });
        }
        else
        {
          await fetch(`https://6537e9dfa543859d1bb10641.mockapi.io/record/${i.id}`,
          {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(UpdatedObj)
          })
        }
        
      }
    })

  }
  edit(id: string) {
    this.router.navigate(["edit", id]);
  }
  view(id: string) {
    this.router.navigate(["attendance-record", id]);
  }
}
