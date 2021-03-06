import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private snack: MatSnackBar, private cdref: ChangeDetectorRef){}
  obj: any;
  dark: boolean = false;
  loadType: string = "";
  file: any = null;
  texto: string = "";
  fprogress: number = 0;
  questTypes = {mult: 0, short: 0, tf: 0};
  userAn: any = null;
  primeiro: any;
  segundo: any;

  ngOnInti() {
    
  }
  selection(select: string) {
    this.loadType = select;
  }

  loadFile(event: any) {
    this.obj = null;
    //sem arquivo
    if(!event.target.files || event.target.files.length >= 2) {
      this.openSnackbar("Single File", "Make sure you only upload a single file", 3000, true);
    }

    //só um arquivo
    if(event.target.files[0].type != "text/plain") {
      return
    }
    this.file = event.target.files[0];
    const reader = new FileReader();
    
    //carrega o arquivo
    reader.onprogress = ((evt) => {
      this.fprogress = (Math.round(evt.loaded / evt.total * 100));
    });


    //Check se o arquivo é válido (JSON)
    reader.onload = ((evt) => {
      this.questTypes = {mult: 0, short: 0, tf: 0};
      //valido
      if(evt.target?.result?.toString().charAt(0) == '{' || evt.target?.result?.toString().charAt(0) == '[') {
        reader.onloadend = (async(evt)=> {
          this.obj = JSON.parse(await <any>evt.target?.result);
          this.primeiro = this.obj.questions;
          this.segundo = this.obj.general.test.userAnswers;
          this.obj.questions.forEach((t:any) => {
            if(t.type == "objective") {
              this.questTypes.mult += 1;
            }
            if(t.type == "trueFalse") {
              this.questTypes.tf += 1;
            }
            if(t.type == "subjective") {
              this.questTypes.short += 1;
            }
          });
          
        })
      }
      //not é válido
      else {
        this.openSnackbar("Answers not find", "Make sure you are uploading the correct file", 3000, true);
      }
    })
    reader.readAsText(this.file);
 
  }


  chgmode() {
    this.dark = !this.dark;
  }
  getButtonMode():string {
    return this.dark? "Ligh theme" : "Dark theme";
  }

  openSnackbar(label:string, msg: string, time: number, reload: boolean) {
    this.snack.open(msg, label, {duration: time})
    if(reload) {
      setTimeout(() => {
        location.reload();
      }, 3500);
      return
    }
  }

  checkRadioUser(i: number, alt_: any) {
    if(this.loadType == 'Test') {
      return
    }
    return this.obj.general.test.userAnswers[i].answers[0].text == alt_.text ? true : false;
  }
  checkboxUser(id_: number, alt_: any) {
    let ans = false;
    if(this.loadType == 'Test') {
      return
    }
    const quest = this.obj.general.test.userAnswers.filter((q: any)=> q.id == id_);
    for(let i = 0; i < quest[0].answers.length; i++) {
      if(quest[0].answers[i].text == alt_.text) {
        ans = true;
        break;
      }
      else {
        ans = false;
      }
    }
    return ans;
  }
}
