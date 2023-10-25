import { Component } from '@angular/core';
import { ActiveService } from '../active.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  showFiller = false;
  constructor(public as:ActiveService){}

  temp=0
  print(){
    console.log(this.temp);
  }
}
