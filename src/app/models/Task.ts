export class Task {
  constructor(
    public id: number,
    public title: string,
    public createdAt: Date,
    public isDone: boolean,
    public doneAt: Date,
    public description?: string,
  ) {
  }

  static readonly EMPTY_MODEL = {
    id: null,
    title: '',
    description: '',
    createdAt: null,
    isDone: false,
    doneAt: null,
  };
}
