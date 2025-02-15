const DispatchFormStepsIndicator = ({ currentStep, setCurrentStep }: { currentStep: number, setCurrentStep: (step: number) => void }) => {
  
  const gotoTab = (step: number) => {
    setCurrentStep(step);
  }
  
  return (
    <>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <div onClick={() => gotoTab(1)} className={`h-8 w-8 cursor-pointer rounded-full center text-sm font-sora font-medium ${currentStep === 1 ? "bg-primary text-white" : "bg-background text-sub"}`}>
          1
        </div>
        <div className="h-1 w-10 bg-background rounded-full" />
        <div onClick={() => gotoTab(2)} className={`h-8 w-8 cursor-pointer rounded-full center text-sm font-sora font-medium ${currentStep === 2 ? "bg-primary text-white" : "bg-background text-sub"}`}>
          2
        </div>
        <div className="h-1 w-10 bg-background rounded-full" />
        <div onClick={() => gotoTab(3)} className={`h-8 w-8 cursor-pointer rounded-full  center text-sm font-sora font-medium ${currentStep === 3 ? "bg-primary text-white" : "bg-background text-sub"}`}>
          3
        </div>
        <div className="h-1 w-10 bg-background rounded-full" />
        <div onClick={() => gotoTab(4)} className={`h-8 w-8 cursor-pointer rounded-full  center text-sm font-sora font-medium ${currentStep === 4 ? "bg-primary text-white" : "bg-background text-sub"}`}>
          4
        </div>
      </div>
    </>
  );
};

export default DispatchFormStepsIndicator;
