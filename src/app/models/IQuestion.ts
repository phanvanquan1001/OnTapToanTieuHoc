import { IOption } from './IOption';

export interface IQuestion {
  id: number;
  name: string;
  questionTypeId: number;
  options?: IOption[];
  correctAnswer?: string;
  userAnswer?: string;
}
