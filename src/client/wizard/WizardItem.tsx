import React from "react"
import { WizardItemStepArgs } from "./types"

const WizardItem = (
    next: () => number | false,
    prev: () => number | false,
    currentStep: number,
    incrementStepCount: () => void
  ) => (props: WizardItemStepArgs) => {
      const { StepContent, number } = props
    // register this step to the wizard
    // by incrementing the stepcount
    incrementStepCount()
    if (currentStep !== number) return <></>
    return <StepContent next={next} prev={prev} currentStep={currentStep} />
}

export default WizardItem