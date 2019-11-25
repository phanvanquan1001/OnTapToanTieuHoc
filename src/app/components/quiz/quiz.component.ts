import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IQuiz } from 'src/app/models/IQuiz';
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

  timeLeft: number;
  interval;
  ellapsedTime = '00:00';
  isActiveStart: boolean;
  isActivePause: boolean;
  isActiveReset: boolean;
  faClock = faClock;

  constructor() { }

  ngOnInit() {
    this.timeLeft = 60;
    this.ellapsedTime = this.parseTime(this.timeLeft);
    this.isActiveStart = true;
    this.isActivePause = false;
    this.isActiveReset = false;

    this.quiz = {
      id: 1,
      name: 'Ôn tập toán giữa học kỳ 1',
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
        }]
    };

    this.shuffle(this.quiz.questions);
    this.numberAnswers = this.quiz.questions.length;
    this.start();
  }

  onSubmit() {
    this.isSubmit = true;
    this.isActivePause = false;
    this.isActiveReset = true;
    this.scoreCalculation();
    
    let submitAlertText = `Số lượng câu trả lời đúng của bạn: ${this.correctAnswers} / ${this.numberAnswers} câu`

    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      text: submitAlertText,
      allowOutsideClick: false
    });
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
      if (this.timeLeft === 0) {
        clearInterval(this.interval);
        Swal.fire({
          icon: 'info',
          title: 'Hết giờ!',
          text: 'Đã hết thời gian làm bài!',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            this.onSubmit();
          }
        });
      }

      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.ellapsedTime = this.parseTime(this.timeLeft);
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

  shuffle(listQuestions) {
    for (let i = listQuestions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let x = listQuestions[i];
      listQuestions[i] = listQuestions[j];
      listQuestions[j] = x;
    }

    return listQuestions;
  }
}
