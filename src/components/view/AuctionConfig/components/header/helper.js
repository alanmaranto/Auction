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

const getSteps = (auctionStep) => {
  let completed = true;
  const formatedSteps = [...steps].map((currentStep) => {
    currentStep.completed = completed;
    if (currentStep.title === auctionStep) {
      currentStep.completed = false;
      currentStep.active = true;
      completed = false;
    }
    return currentStep;
  });
  return formatedSteps;
};

export { getSteps };
