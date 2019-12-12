export interface ICorrectCodes {
  id?: number;
}

export class CorrectCodes implements ICorrectCodes {
  constructor(public id?: number) {}
}
