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
  @ViewChild('totalQuestions') totalQuestionsKey!: ElementRef;
  @ViewChild('category') categoryKey!: ElementRef;
  @ViewChild('level') levelKey!: ElementRef;
  @ViewChild('questionType') questionTypeKey!: ElementRef;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.welcomeForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.min(4)]],
      totalQuestions: [10,[Validators.required]],
      category: ['Conocimiento General',[Validators.required]],
      level: ['Fácil',[Validators.required]],
      questionType: ['Aleatoria',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  startQuiz() {
    localStorage.setItem("name", this.nameKey.nativeElement.value)
    // localStorage.setItem("totalQuestions", this.totalQuestionsKey.nativeElement.value)
    // localStorage.setItem("category", this.categoryKey.nativeElement.value)
    // localStorage.setItem("level", this.levelKey.nativeElement.value)
    // localStorage.setItem("questionType", this.questionTypeKey.nativeElement.value)
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
