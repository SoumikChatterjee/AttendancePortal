import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ActiveService } from '../active.service';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentInput: FormGroup;

  newStudent = {
    name: '',
    email: '',
    phone: 0
  };
  students: any;
  constructor(private fb: FormBuilder, private roo: Router, private as: ActiveService, private api: ApiService) {

  }
  ngOnInit(): void {

    this.studentInput = this.fb.group({
      studentName: this.fb.control('', [Validators.required, Validators.pattern('^[A-Za-z\'\\- ]*$')]),
      studentEmail: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.control('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)])
    });

    this.api.getAllStudentDetails().subscribe(data => {
      this.students = data;
    })

  }
  async buttonPressed() {
    this.newStudent.name = this.studentInput.value.studentName
    this.newStudent.email = this.studentInput.value.studentEmail
    this.newStudent.phone = Number(this.studentInput.value.phoneNumber)

    const existingEmail = this.students.find((s: any) => s.email === this.newStudent.email);
    const existingPhone = this.students.find((s: any) => s.phone === this.newStudent.phone);

    if (existingEmail || existingPhone) {
      alert('Email or phone number is already taken.');
    } else {


      const button1 = document.querySelector('button') as HTMLButtonElement;
      button1.disabled = true;
      button1.innerText = "Submitting..."

      console.log(this.newStudent);

      this.api.postStudentData(this.newStudent).subscribe((response: any) => {
        console.log(response);
        this.api.StudentDataFlag = false;
        
        if (this.roo)
          this.roo.navigate(['student-list'])
        this.as.pointer = 1;


        alert('Student added successfully.');
      });


    }




  }
}
