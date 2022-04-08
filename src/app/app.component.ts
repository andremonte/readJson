import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file: string = "";

  selection(select: string) {
    alert(select);
  }
  load(event: any) {
    if(event.target.files.length) {
      console.log(event.target.files);
    }
    else {
      console.log("Deu certo não");
    }
  }
}
