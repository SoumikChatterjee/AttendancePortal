import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cachedStudentData: any[] = null;
  private cachedRecordData: any[] = null;

  public StudentDataFlag = false;
  public RecordDataFlag = false;
  constructor(private http: HttpClient) { }

  getAllStudentDetails(): Observable<any[]> {
    if (this.StudentDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedStudentData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.StudentDataFlag = true;
      return this.http.get<any[]>('https://6537e9dfa543859d1bb10641.mockapi.io/students').pipe(
        map(data => {
          this.cachedStudentData = data;
          return data;
        })
      );
    }
  }

  getAllStudentDetailsByID(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  getAllStudentRecord(): Observable<any[]> {
    if (this.RecordDataFlag) {
      console.log("Api not fetched");
      
      return of(this.cachedRecordData);
    } else {
      console.log("Api fetched");
      
      this.RecordDataFlag = true;
      // Fetch data from API and cache it
      return this.http.get<any[]>('https://6537e9dfa543859d1bb10641.mockapi.io/record').pipe(
        map(data => {
          this.cachedRecordData = data;
          return data;
        })
      );
    }
  }

  postStudentData(std: any): Observable<any> {
    console.log(std);

    return this.http.post<any>('https://6537e9dfa543859d1bb10641.mockapi.io/students', JSON.stringify(std), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  postStudentRecord(rec: any): Observable<any> {
    return this.http.post<any>('https://6537e9dfa543859d1bb10641.mockapi.io/record', JSON.stringify(rec), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  deleteStudentRecord(id: any): Observable<any> {
    return this.http.delete('https://6537e9dfa543859d1bb10641.mockapi.io/record/' + id);
  }
  putStudentRecord(id:any,record: any): Observable<any> {    
    return this.http.put('https://6537e9dfa543859d1bb10641.mockapi.io/record/' + id,
      JSON.stringify(record),
      {
        headers: { 'Content-Type': 'application/json', },
      });
  }
  deleteStudentDetails(id: any): Observable<any> {
    return this.http.delete('https://6537e9dfa543859d1bb10641.mockapi.io/students/' + id);
  }
  putStudentData(id:any,record:any):Observable<any> 
  {
    return this.http.put('https://6537e9dfa543859d1bb10641.mockapi.io/students/' + id,
      JSON.stringify(record),
      {
        headers: { 'Content-Type': 'application/json', },
      });
  }

}