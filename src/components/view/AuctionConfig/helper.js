const steps = [
  {
    title: "rfi",
    subtitle: "Propuesta técnica y registro de inventarios",
  },
  {
    title: "fa_hl",
    subtitle: "Foro Aclaraciones / Propuesta Técnica",
  },
  {
    title: "sub",
    subtitle: "Suministros y Ulala",
  },
];

const getNextStep = (currentStep) => {
  let currentStepIndex = 0; 
  steps.forEach((element, index) => {
    if (element.title === currentStep) {
      currentStepIndex = index;
    }
  });

  if (currentStepIndex === steps.length) {
    return false;
  }
  return steps[currentStepIndex + 1].title;
};

export { steps, getNextStep };
