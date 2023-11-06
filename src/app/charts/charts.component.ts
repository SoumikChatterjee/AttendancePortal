import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
interface record {
  date: string,
  pid: [string],
  id: string
}
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  data: Array<record> | null;
  basicData: any;
  constructor(private api:ApiService){ }
  ngOnInit(): void {
      this.api.getAllStudentRecord().subscribe(data=>{
        this.data=data;
        console.log(data);
        
        this.sortData();
        this.chart();
      })
  }
  basicOptions: any;
  async chart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    this.basicData = {
      labels: this.data?.map((i)=>i.date),
      datasets: [
        {
          label: 'Attendance',
          data: this.data?.map((i)=>i.pid.length),
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
  
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
 sortData() {

    this.data?.sort((a, b) => {
      let dateA = new Date(a.date.split("/").reverse().join("-"));
      let dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });

  }
}

