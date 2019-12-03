import { Component, OnInit } from '@angular/core';
import {
  faClock,
  faFile, faPen, faPaperPlane, faAward,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faEdit, faFileAlt, faArrowLeft, faTimes, faCheck
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IQuiz } from 'src/app/models/IQuiz';
import { IPager } from 'src/app/models/IPager';
import { IQuestion } from 'src/app/models/IQuestion';
import { QuizService } from 'src/app/services/quiz.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  quiz: IQuiz;
  correctAnswers = 0;
  numberAnswers = 0;
  isSubmit = false;

  maxtime: number;
  currentTime: number;
  quizProgress: number;
  interval;
  ellapsedMaxTime = '00:00';
  ellapsedCurrentTime = '00:00';
  isActiveStart: boolean;
  isActivePause: boolean;
  isActiveReset: boolean;

  // Font-awesome icon
  faClock = faClock;
  faPen = faPen;
  faFile = faFile;
  faEdit = faEdit;
  faPaperPlane = faPaperPlane;
  faAward = faAward;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngleDoubleRight = faAngleDoubleRight;
  faFileAlt = faFileAlt;
  faArrowLeft = faArrowLeft;
  faTimes = faTimes;
  faCheck = faCheck;

  // Page
  isOpenQuizPage: boolean;
  isOpenReviewPage: boolean;
  isOpenSubmitPage: boolean;
  isOpenResultPage: boolean;
  pager: IPager;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.get('data/lop1/giuaky1-de1.json').subscribe(res => {
      this.quiz = res;

      this.shuffle(this.quiz.questions);
      this.shuffleOption(this.quiz.questions);
      this.numberAnswers = this.quiz.questions.length;
      this.pager.count = this.numberAnswers;
      this.start();
    });

    this.currentTime = 0;
    this.quizProgress = 0;
    this.maxtime = 60;
    this.isOpenQuizPage = true;
    this.isOpenReviewPage = false;
    this.isOpenSubmitPage = false;
    this.isOpenResultPage = false;
    this.ellapsedMaxTime = this.parseTime(this.maxtime);
    this.ellapsedCurrentTime = this.parseTime(this.currentTime);
    this.isActiveStart = true;
    this.isActivePause = false;
    this.isActiveReset = false;
    this.pager = {
      index: 0,
      size: 1,
      count: 1
    };
  }

  // Handle event when user clicked button Nop bai
  onSubmit() {
    this.pause();
    if (this.currentTime < this.maxtime) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Bạn có nộp bài hay không ?',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.submitQuiz();
        } else {
          this.start();
        }
      });
    }

  }

  // Submit quiz
  submitQuiz() {
    this.isSubmit = true;
    this.isOpenQuizPage = false;
    this.isOpenReviewPage = false;
    this.isOpenSubmitPage = true;
    this.isOpenResultPage = false;
    this.isActivePause = false;
    this.isActiveReset = true;
    clearInterval(this.interval);
    this.scoreCalculation();
  }

  scoreCalculation() {
    this.correctAnswers = 0;
    this.quiz.questions.forEach(question => {
      switch (question.questionTypeId) {
        case 1: {
          question.options.forEach(option => {
            if (question.userAnswer === option.name && option.isAnswer) {
              this.correctAnswers++;
            }
          });
          break;
        }

        case 2: {
          if (question.userAnswer === question.correctAnswer) {
            this.correctAnswers++;
          }
          break;
        }
      }
    });
  }

  // Timer component
  start() {
    this.isActiveStart = false;
    this.isActivePause = true;

    this.interval = setInterval(() => {
      if (this.currentTime === this.maxtime) {
        clearInterval(this.interval);
        Swal.fire({
          icon: 'info',
          title: 'Hết giờ!',
          text: 'Đã hết thời gian làm bài!',
          allowOutsideClick: false,
          confirmButtonText: 'Xem kết quả'
        }).then((result) => {
          if (result.value) {
            this.submitQuiz();
          }
        });
      }

      if (this.currentTime < this.maxtime) {
        this.currentTime++;
        this.ellapsedCurrentTime = this.parseTime(this.currentTime);
      } else {
      }
    }, 1000);
  }

  pause() {
    this.isActiveStart = true;
    this.isActivePause = false;
    this.isActiveReset = true;
    clearInterval(this.interval);
  }

  reset() {
    this.isActiveStart = true;
    this.isActivePause = false;
    this.isActiveReset = false;
    this.isSubmit = false;
    clearInterval(this.interval);
    this.ngOnInit();
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onClose(event: CloseEvent) {
    this.start();
  }

  onReview() {
    this.isOpenReviewPage = true;
    this.isOpenSubmitPage = false;
    this.isOpenResultPage = false;
    this.isOpenQuizPage = false;
  }

  // Shuffle questions and answer on quiz
  shuffle(listQuestions: IQuestion[]) {
    for (let i = listQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = listQuestions[i];
      listQuestions[i] = listQuestions[j];
      listQuestions[j] = x;
    }

    return listQuestions;
  }

  // Shuffle option of quiz
  shuffleOption(listQuestions: IQuestion[]) {
    listQuestions.forEach(question => {
      if (question.questionTypeId === 1) {
        for (let option = question.options.length - 1; option > 0; option--) {
          const j = Math.floor(Math.random() * (option + 1));
          const temp = question.options[option];
          question.options[option] = question.options[j];
          question.options[j] = temp;
        }
      }
    });

    return listQuestions;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ? this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  get isFirstQuestion() {
    return this.pager.index === 0;
  }

  get checkNextQuestion() {
    return this.pager.index + 1 > this.quiz.questions.length - 1;
  }

  get checkPreviousQuestion() {
    return this.pager.index - 1 < 0;
  }

  get isLastQuestion() {
    return this.pager.index === this.quiz.questions.length - 1;
  }

  goTo(index: number) {
    this.isOpenQuizPage = true;
    this.isOpenReviewPage = false;
    this.isOpenSubmitPage = false;
    this.isOpenResultPage = false;

    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
    this.quizProgress = ((this.pager.index + 1) * 100) / (this.pager.count);
    console.log(this.quizProgress);
  }

  goToResultPage() {
    this.isOpenResultPage = true;
  }

  displayResult(question: IQuestion) {
    let result = false;

    question.options.forEach(option => {
      if (question.userAnswer === option.name && option.isAnswer) {
        result = true;
      }
    });

    return result;
  }
}
