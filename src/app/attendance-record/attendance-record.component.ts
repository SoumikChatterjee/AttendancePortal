import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ActiveService } from '../active.service';
interface record {
  date: string,
  pid: [string],
  id: string
}
@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.scss']
})
export class AttendanceRecordComponent implements OnInit {

  constructor(private ar: ActivatedRoute,private api:ApiService,private as:ActiveService) {  
    as.pointer=-1;
  }
  
  data: Array<record> | null;

  id: string | null
   ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id')
    this.api.getAllStudentRecord().subscribe(data=>{
      this.data=data;
      this.sortData();
    })
  }
  async sortData() {

    this.data?.sort((a, b) => {
      let dateA = new Date(a.date.split("/").reverse().join("-"));
      let dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
  }
  checkPresent(date: string) {
    const RecordObj = this.data?.find((i) => i.date === date);
    const isInPid = RecordObj?.pid.find((i) => i === this.id)
    if (isInPid === undefined) {
      return "Absent";
    }
    else {
      return "Present";
    }
  }
  ngOnDestroy() {
    this.as.pointer=1;
  }
}
