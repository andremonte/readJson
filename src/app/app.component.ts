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
  file2: any;
  texto: string = "";
  fprogress: number = 40;
  fprogress2: number = 100;

  selection(select: string) {
    this.loadType = select;
  }

  loadFile(event: any) {
    if(!event.target.files) {
      return
    }
    if(event.target.files.length >= 2) {
      this.file2 = event.target.files[1];
    }

    this.file = event.target.files[0];
    console.log(this.file)
    const reader = new FileReader();
    reader.onload = ((evt)=>{
      console.log(reader.result);
      this.obj = JSON.parse(<any>evt.target?.result);
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
