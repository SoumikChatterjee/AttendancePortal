import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { ChartsComponent } from './charts/charts.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    component:StudentListComponent,
    path:"student-list"
  },
  {
    component:ChartsComponent,
    path:"charts"
  },
  {
    component:MarkAttendanceComponent,
    path:"mark-attendance"
  },
  {
    component:AddStudentComponent,
    path:"add-student"
  },
  {
    component:EditComponent,
    path:"edit/:id"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
