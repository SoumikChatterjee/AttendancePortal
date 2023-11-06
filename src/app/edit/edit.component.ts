import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveService } from '../active.service';
import { ApiService } from '../services/api.service';

interface studentInterface {
  name: string;
  id: string;
  phone: number;
  email: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: string | null;
  studentInput: FormGroup;
  data: studentInterface
  students: Array<studentInterface>;
  newStudent = {
    name: '',
    email: '',
    phone: 0
  };
  constructor(private ar: ActivatedRoute, private fb: FormBuilder, private roo: Router, private as: ActiveService, private api: ApiService) {
  }
  ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id');
    console.log(this.id);
    this.studentInput = this.fb.group({
      studentName: this.fb.control('', [Validators.required, Validators.pattern('^[A-Za-z\'\\- ]*$')]),
      studentEmail: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.control('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)])
    });

    this.api.getAllStudentDetailsByID(`https://6537e9dfa543859d1bb10641.mockapi.io/students/${this.id}`).subscribe((data: any) => {
      this.data = data;
      this.fetchData();
    })

  }
  fetchData() {

    this.studentInput.patchValue({
      studentName: this.data.name,
      studentEmail: this.data.email,
      phoneNumber: this.data.phone
    });

  }
  async buttonPressed() {
    console.log("Clicked");

    this.api.getAllStudentDetails().subscribe(async (data: any) => {
      this.students = data;



      this.newStudent.name = this.studentInput.value.studentName
      this.newStudent.email = this.studentInput.value.studentEmail
      this.newStudent.phone = Number(this.studentInput.value.phoneNumber)

      const existingEmail = this.students.find((s: any) => s.email === this.newStudent.email && s.id !== this.id);
      const existingPhone = this.students.find((s: any) => s.phone === this.newStudent.phone && s.id !== this.id);

      if (existingEmail || existingPhone) {
        alert('Email or phone number is already taken.');
      } else {

        const button1 = document.querySelector('button') as HTMLButtonElement;
        button1.disabled = true;
        button1.innerText = "Submitting..."

        this.newStudent.name = this.studentInput.value.studentName
        this.newStudent.email = this.studentInput.value.studentEmail
        this.newStudent.phone = Number(this.studentInput.value.phoneNumber)

        this.api.putStudentData(this.id,this.newStudent).subscribe((response) => {
          this.api.StudentDataFlag = false;
          if (this.roo)
            this.roo.navigate(['student-list'])
          this.as.pointer = 1;
          alert('Student updated successfully.');
        })


      }





    })


  }
}
