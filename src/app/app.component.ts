import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obj: any;
  dark: boolean = false;
  homi: any; //string
  loadType: string = "";

  selection(select: string) {
    this.loadType = select;
  }

  loadFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = ((evt)=>{
      this.homi = evt.target?.result;
      this.obj = JSON.parse(this.homi);
    })
    reader.readAsText(file);
  }

  chgmode() {
    this.dark = !this.dark;
  }
  getButtonMode():string {
    return this.dark? "Ligh theme" : "Dark theme";
  }

}
