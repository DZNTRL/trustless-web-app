export class StepIncrementer {
    stepCount: number = 0;
    incrementStep() {
      ++this.stepCount
    }
    constructor() {
      this.incrementStep = this.incrementStep.bind(this)
    }
  }
  