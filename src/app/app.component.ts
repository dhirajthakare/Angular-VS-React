import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'demoApp';
  startDate = new Date();
  formDetails : any

  constructor(private pb : FormBuilder){

  }

  ngOnInit(): void {
    this.formDetails = this.pb.group({
      name:'dhiraj',
      birthday : ''
    })
  }

  getDetails(){
    console.log(this.formDetails.value);
  }

}
