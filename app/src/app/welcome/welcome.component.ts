import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  welcomeForm: FormGroup;
  name: string = "";

  @ViewChild('name') nameKey!: ElementRef;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.welcomeForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.min(4)]],
    });
  }

  ngOnInit(): void {
  }
  startQuiz() {
    localStorage.setItem("name", this.nameKey.nativeElement.value)
  }


  onSubmit(): void {
    this.welcomeForm.controls['name'].markAsTouched();
    this.welcomeForm.controls['name'].setValue(this.nameKey.nativeElement.value);

    if(!this.welcomeForm.invalid) {
      this.startQuiz();
      this.router.navigate(['/question']);
    }
  }

}
