import { Component, OnInit } from '@angular/core';
import {
  faClock,
  faFile, faPen, faPaperPlane, faAward,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IQuiz } from 'src/app/models/IQuiz';
import { IPager } from 'src/app/models/IPager';
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
  faPaperPlane = faPaperPlane;
  faAward = faAward;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngleDoubleRight = faAngleDoubleRight;

  // Page
  isOpenQuizPage: boolean;
  pager: IPager;

  constructor() { }

  ngOnInit() {
    this.currentTime = 0;
    this.maxtime = 60;
    this.isOpenQuizPage = true;
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
    this.quiz = {
      id: 1,
      name: 'Ôn tập giữa học kỳ 1',
      description: 'this is my quiz',
      questions: [
        {
          id: 1,
          name: '1 + 1 = ...',
          questionTypeId: 2,
          correctAnswer: '2',
          userAnswer: ''
        },
        {
          id: 2,
          name: '1 + 5 = ...',
          questionTypeId: 2,
          correctAnswer: '6',
          userAnswer: ''
        },
        {
          id: 3,
          name: '5 + 5 = ...',
          questionTypeId: 1,
          options: [
            {
              id: 1,
              questionId: 3,
              name: '9',
              isAnswer: false
            },
            {
              id: 2,
              questionId: 3,
              name: '10',
              isAnswer: true
            },
            {
              id: 3,
              questionId: 3,
              name: '11',
              isAnswer: false
            },
            {
              id: 4,
              questionId: 3,
              name: '12',
              isAnswer: false
            }]
        },
        {
          id: 4,
          name: '5 + 4 ... 4 + 5',
          questionTypeId: 1,
          options: [
            {
              id: 5,
              questionId: 4,
              name: '>',
              isAnswer: false
            },
            {
              id: 6,
              questionId: 4,
              name: '=',
              isAnswer: true
            },
            {
              id: 7,
              questionId: 4,
              name: '<',
              isAnswer: false
            }]
        },
        {
          id: 5,
          name: '10 - 6 = ...',
          questionTypeId: 2,
          correctAnswer: '4',
          userAnswer: ''
        },
        {
          id: 6,
          name: '3 + 6 = ...',
          questionTypeId: 2,
          correctAnswer: '9',
          userAnswer: ''
        },
        {
          id: 7,
          name: '6 + ... = 9',
          questionTypeId: 2,
          correctAnswer: '3',
          userAnswer: ''
        },
        {
          id: 8,
          name: '9 - 4 + 5 = ...',
          questionTypeId: 2,
          correctAnswer: '10',
          userAnswer: ''
        },
        {
          id: 9,
          name: '3 ... 4',
          questionTypeId: 2,
          correctAnswer: '<',
          userAnswer: ''
        },
        {
          id: 10,
          name: '3 < ... < 5',
          questionTypeId: 2,
          correctAnswer: '4',
          userAnswer: ''
        },
        {
          id: 11,
          name: '3 + 2 ... 5',
          questionTypeId: 1,
          options: [
            {
              id: 8,
              questionId: 11,
              name: '>',
              isAnswer: false
            },
            {
              id: 9,
              questionId: 11,
              name: '=',
              isAnswer: true
            },
            {
              id: 10,
              questionId: 11,
              name: '<',
              isAnswer: false
            }]
        },
        {
          id: 12,
          name: 'Số lớn nhất trong các số: 2, 5, 7, 9 là:',
          questionTypeId: 1,
          options: [
            {
              id: 11,
              questionId: 12,
              name: '2',
              isAnswer: false
            },
            {
              id: 12,
              questionId: 12,
              name: '5',
              isAnswer: false
            },
            {
              id: 13,
              questionId: 12,
              name: '7',
              isAnswer: false
            },
            {
              id: 14,
              questionId: 12,
              name: '9',
              isAnswer: true
            }]
        },
        {
          id: 13,
          name: 'Số lớn nhất trong các số: 7, 4, 8, 6 là:',
          questionTypeId: 1,
          options: [
            {
              id: 15,
              questionId: 13,
              name: '7',
              isAnswer: false
            },
            {
              id: 16,
              questionId: 13,
              name: '4',
              isAnswer: false
            },
            {
              id: 17,
              questionId: 13,
              name: '6',
              isAnswer: false
            },
            {
              id: 18,
              questionId: 13,
              name: '8',
              isAnswer: true
            }]
        },
        {
          id: 14,
          name: 'Dãy các số theo thứ tự từ 0 đến 10',
          questionTypeId: 1,
          options: [
            {
              id: 19,
              questionId: 14,
              name: '0, 1, 2, 3, 4, 5, 6, 7, 8 ,9, 10',
              isAnswer: true
            },
            {
              id: 20,
              questionId: 14,
              name: '0, 1, 2, 3, 4, 7, 6, 5, 8, 9, 10',
              isAnswer: false
            },
            {
              id: 21,
              questionId: 14,
              name: '0, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10',
              isAnswer: false
            },
            {
              id: 22,
              questionId: 14,
              name: '0, 1, 2, 7, 4, 5, 6, 8, 3, 9, 10',
              isAnswer: false
            }]
        },
        {
            id: 15,
            name: '7 + 1 = ...',
            questionTypeId: 2,
            correctAnswer: '8',
            userAnswer: ''
        }]
    };

    this.shuffle(this.quiz.questions);
    this.numberAnswers = this.quiz.questions.length;
    this.pager.count = this.numberAnswers;
    this.start();
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

  // Shuffle questions on quiz
  shuffle(listQuestions) {
    for (let i = listQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = listQuestions[i];
      listQuestions[i] = listQuestions[j];
      listQuestions[j] = x;
    }

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
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
  }
}
