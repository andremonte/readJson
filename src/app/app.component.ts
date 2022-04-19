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
  fprogress: number = 0;
  fprogress2: number = 0;

  selection(select: string) {
    this.loadType = select;
  }

  loadFile(event: any) {
    this.obj = null;
    //sem arquivo
    if(!event.target.files) {
      return
    }
    //mais de um arquivo
    if(event.target.files.length >= 2) {
      this.file2 = event.target.files[1];
      const reader2 = new FileReader();
      reader2.onprogress = ((evt) => {
        this.fprogress2 = (Math.round(evt.loaded / evt.total * 100));
      });
      reader2.onload = ((evt) => {
        //valido
        if(evt.target?.result?.toString().charAt(0) == '{' || evt.target?.result?.toString().charAt(0) == '[') {
          reader.onloadend = (async(evt)=> {
            this.obj = JSON.parse(await <any>evt.target?.result);
          })
        }
        //not é válido
        else {
          alert("File not supported");
          location.reload();
          return;
        }
      })
      reader2.readAsText(this.file2);
    }
    //só um arquivo
    this.file = event.target.files[0];
    const reader = new FileReader();
    
    //carrega o arquivo
    reader.onprogress = ((evt) => {
      this.fprogress = (Math.round(evt.loaded / evt.total * 100));
    });


    //Check se o arquivo é válido (JSON)
    reader.onload = ((evt) => {
      //valido
      if(evt.target?.result?.toString().charAt(0) == '{' || evt.target?.result?.toString().charAt(0) == '[') {
        reader.onloadend = (async(evt)=> {
          this.obj = JSON.parse(await <any>evt.target?.result);
        })
      }
      //not é válido
      else {
        alert("File not supported");
        location.reload();
        return;
      }
    })

    reader.readAsText(this.file);
/*     reader.onload = ((evt)=>{
      this.obj = JSON.parse(<any>evt.target?.result);
    })
    reader.readAsText(this.file); */
    
  }

  chgmode() {
    this.dark = !this.dark;
  }
  getButtonMode():string {
    return this.dark? "Ligh theme" : "Dark theme";
  }

}
