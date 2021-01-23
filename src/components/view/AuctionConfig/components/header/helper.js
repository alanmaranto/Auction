import { steps } from "../../helper";

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
