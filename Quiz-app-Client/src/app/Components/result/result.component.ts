import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  questionSorted: any[] = []
  true: boolean = true;

  secondRemainingStoredFromStorage: any = (localStorage.getItem('secondsRemaining'));
  currentQuestionStoredFromStorage: any = (localStorage.getItem('currentQuestion'));
  qnsStoredFromStorage: any = (localStorage.getItem('qns'));

  constructor(private router: Router, public quizService: QuizService) { }
  ngOnInit() {
    if (localStorage.getItem('QuizCompleteIndicator') == 'true') {
      //this.quizService.seconds=parseInt(this.secondRemainingStoredFromStorage);
      this.quizService.currentQuestion = parseInt(this.currentQuestionStoredFromStorage);
      this.quizService.qns = JSON.parse(this.qnsStoredFromStorage);

      this.questionSorted = this.quizService.qns.sort((a, b) => a.questionId - b.questionId);
      //console.log(this.questionSorted)

      this.quizService.getAnswers().subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          this.questionSorted.forEach((e, i) => {
            //console.log(this.quizService);
            //console.log(e.answer);
            if (e.answer == data[i].correctAns)
              this.quizService.correctAnswerCount++;
            e.correctAns = data[i].correctAns;
          });
        });
    }
    else
      this.router.navigate(['/quiz']);

  }
  resetQuizButton() {
    this.quizService.resetQuiz();
    this.router.navigate(['']);
  }
}
