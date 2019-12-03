import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuiz } from '../models/IQuiz';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get<IQuiz>(url);
  }

  getAll() {
    return [
      { id: 'data/lop1-giuaky1-de1.json', name: 'De1' },
      { id: 'data/lop1-giuaky1-de2.json', name: 'De2' }
    ];
  }
}
