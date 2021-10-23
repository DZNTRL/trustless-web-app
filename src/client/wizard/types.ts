export type StepArgs = {
    next: () => void
    prev: () => void
    currentStep: number
}

export type WizardItemStepArgs = {
    StepContent: React.FunctionComponent<StepArgs>,
    number: number
}
