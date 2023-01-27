import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  secondStoredFromStorage: any = (localStorage.getItem('seconds'));
  currentQuestionStoredFromStorage: any = (localStorage.getItem('currentQuestion'));
  qnsStoredFromStorage:any=(localStorage.getItem('qns'));

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit(): void {

    if ((this.qnsStoredFromStorage==null || this.quizService.seconds==null)) {
      this.startCounter();
      this.getRandom5Question();
      console.log(this.quizService.interval_);
    }
    else {
      
      this.quizService.qns=JSON.parse(this.qnsStoredFromStorage);
      this.quizService.seconds = parseInt(this.secondStoredFromStorage);
      this.startCounter();
      console.log(this.quizService.qns)
      this.quizService.currentQuestion = parseInt(this.currentQuestionStoredFromStorage);
      
    }

  }

  getRandom5Question() {
    this.quizService.get5Questions().subscribe(
      (data: any) => {
        this.quizService.qns = data;
        localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
       // console.log(this.quizService.qns);
      }
    );
  }
  submit() {
    localStorage.removeItem('seconds');
    this.quizService.interval_.unsubscribe();
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    localStorage.setItem('secondsRemaining', this.quizService.seconds.toString());
    this.stopCounter();
    localStorage.setItem('QuizCompleteIndicator', 'true');
    
    localStorage.setItem('currentQuestion', this.quizService.currentQuestion.toString());
    this.router.navigate(['/result']);
  }
  displayTimeRemaining() {
    return Math.floor(this.quizService.seconds / 3600) + ':' +
      Math.floor(this.quizService.seconds / 60) + ':' +
      Math.floor(this.quizService.seconds % 60);
  }
  startCounter() {
    this.quizService.interval_ = interval(1000)
      .subscribe(val => {
        if (this.quizService.seconds > 0)
          this.quizService.seconds--;
        localStorage.setItem('seconds', this.quizService.seconds.toString());
        if (this.quizService.seconds === 0) {
          this.submit();
          this.stopCounter();
        }
      });
    setTimeout(() => {
      this.quizService.interval_.unsubscribe();
    }, 300000);
  }
  stopCounter() {
    this.quizService.interval_.unsubscribe();
    this.quizService.seconds = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.quizService.seconds = this.quizService.quizTime;
  }
  answer(choice: number) {
    this.quizService.qns[this.quizService.currentQuestion].answer = choice;
  }
  nextQuestion() {
    this.quizService.currentQuestion++;
    localStorage.setItem('currentQuestion', this.quizService.currentQuestion.toString());
  }
  previousQuestion() {
    this.quizService.currentQuestion--;
    localStorage.setItem('currentQuestion', this.quizService.currentQuestion.toString());
  }
  clrStorage() {
    this.quizService.interval_.unsubscribe();
    localStorage.clear();
  }
}
