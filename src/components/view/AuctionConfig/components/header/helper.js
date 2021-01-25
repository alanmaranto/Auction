import { steps } from "../../helper";

const getSteps = (auctionStep) => {
  let completed = auctionStep ? true : false;
  const formatedSteps = [...steps].map((currentStep) => {
    currentStep.completed = completed;
    if (currentStep.value === auctionStep) {
      currentStep.completed = false;
      currentStep.active = true;
      completed = false;
    }
    return currentStep;
  });
  return formatedSteps;
};

export { getSteps };
