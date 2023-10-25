import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.scss']
})
export class AttendanceRecordComponent implements OnInit{
  constructor(private ar:ActivatedRoute){

  }
  id:string|null
  ngOnInit(): void {
      this.id=this.ar.snapshot.paramMap.get('id')
  }
}
