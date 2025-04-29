interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgressBar({ currentStep, totalSteps }: StepProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mt-6">
      <div className="step-progress">
        <div
          className="step-progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-neutral-300">
        {currentStep} of {totalSteps} steps completed
      </div>
    </div>
  );
}
