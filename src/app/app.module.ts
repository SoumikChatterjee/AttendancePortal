import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { ChartsComponent } from './charts/charts.component';
import {MatTableModule} from '@angular/material/table';
import { EditComponent } from './edit/edit.component';
import { AttendanceRecordComponent } from './attendance-record/attendance-record.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddStudentComponent,
    MarkAttendanceComponent,
    ChartsComponent,
    EditComponent,
    AttendanceRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ChartModule,
    TableModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
