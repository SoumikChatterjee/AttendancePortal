import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private ar: ActivatedRoute) {
    this.fetchData();
  }
  data: Array<record> | null;

  id: string | null
   ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id')

  }
  async fetchData() {
    const response = await fetch('https://6537e9dfa543859d1bb10641.mockapi.io/record')
    this.data = await response.json();
    console.log(this.data);
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
}
