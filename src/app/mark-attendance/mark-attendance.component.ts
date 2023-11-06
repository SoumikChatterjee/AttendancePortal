import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from '../services/api.service';

interface student {
  id: string,
  name: string,
  email: string,
  phone: number
}
interface attRecord {
  date: string,
  pid: Array<string>
  id: string
}
@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss'],
})
export class MarkAttendanceComponent implements OnInit {
  studentInput: FormGroup
  data: Array<student>
  recordData: Array<attRecord>
  record = {
    date: '',
    pid: [''],
    attendance: ''
  }
  constructor(private fb: FormBuilder,private api:ApiService) {
    this.api.getAllStudentDetails().subscribe((i)=>{
      this.data=i;
    })
  }
  ngOnInit(): void {
    this.studentInput = this.fb.group({
      studentId: ['', Validators.required],
      date: ['', Validators.required],
      attendance: ['', Validators.required]
    });

  }
  async buttonPressed() {

    
    //Fetching data from reactive form and storing in our temp object, which we will push in api
    this.record.pid = [this.studentInput.value.studentId + ""];
    const dateString = this.studentInput.value.date.toLocaleDateString('en-GB');
    this.record.date = dateString;
    this.record.attendance = this.studentInput.value.attendance;


    //Checking user id is valid or not
    const isPresent = this.data.find((i) => i.id === (this.studentInput.value.studentId + ""))

    if (isPresent === undefined) {
      alert("User with id " + this.studentInput.value.studentId + " is not present")
    }
    else // User with given Id is valid(Present in the list)
    {
      this.api.getAllStudentRecord().subscribe(async (i)=>{
        this.recordData =i;


        //Checking whether attendance log is there for the same date or not if present just update the pid array otherwise we need to create one new obj for that
      const obj = this.recordData.find((i) => i.date === this.record.date
      )
      if (obj === undefined && this.record.attendance === 'Present') { //If obj is undefined, we are pushing as it is. Because the obj for the given date is not present only.
        alert("Attendance Marked");
        this.studentInput.reset();
        this.api.postStudentRecord(this.record).subscribe((i)=>{

        })

      }
      else if (obj !== undefined) { // If not undefined, which means date is already present we need to append/delete new pid with existing pid array of the obj.

        
        //Checking whether the same id is present for the same date. To avoid redundancy
        let isIdPresent = obj.pid.find((i) => i === this.record.pid[0])
        //If undefined it means on the given date the student was not previously present
        if (isIdPresent === undefined && this.record.attendance === 'Present') {
          alert("Attendance Marked")
          this.studentInput.reset();
          //Appending existing pid with the current object's pid which we are going to push in the api
          this.record.pid = [...obj.pid, ...this.record.pid];

        }
        else {
          console.log("Id already present for the date");
          if (this.record.attendance !== 'Present') {
            alert("Attendance Updated. Marked Absent")
            this.studentInput.reset();
            //Removing the id of the absentees if previously present on that date. 
            //-->Using as an updation
            const filteredPid = obj.pid.filter((i) => i !== this.record.pid[0])
            this.record.pid = [...filteredPid]
          }
          else {
            //Overwriting the array with existing pid array fetched from the api
            alert("Already Marked Present")
            this.studentInput.reset();
            this.record.pid = [...obj.pid];
          }
        }

        //Checking the length of the array before updating in mock api. 
        //After updation if length is found to be zero, which means no students were present on that day, we need to delete the entire object.
        if (this.record.pid.length === 0) {
          this.api.deleteStudentRecord(obj.id).subscribe(()=>{});
        }
        else {
          this.api.putStudentRecord(obj.id,this.record).subscribe((response)=>{console.log(response);
          })
        }

      }
      else {
        alert('Attendance Marked')
        this.studentInput.reset();
      }
      })

      
    }
   
    this.api.RecordDataFlag=false;
  }
}
