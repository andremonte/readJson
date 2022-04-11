import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obj: any;
  dark: boolean = false;
  loadType: string = "";
  file: any;

  selection(select: string) {
    this.loadType = select;
  }

  loadFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = ((evt)=>{
      this.obj = JSON.parse(<string>evt.target?.result);
    })
    reader.readAsText(event.target.files[0]);
  }

  chgmode() {
    this.dark = !this.dark;
  }
  getButtonMode():string {
    return this.dark? "Ligh theme" : "Dark theme";
  }

}
