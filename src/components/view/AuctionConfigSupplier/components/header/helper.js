import { steps } from "../../helper";

const getSteps = (auctionStep) => {
  let completed = true;
  const formatedSteps = [];
  [...steps].forEach((currentStep) => {
    const newStep = {
      ...currentStep,
      completed,
      subtitle: "",
    };
    if (currentStep.value === auctionStep) {
      newStep.completed = false;
      newStep.active = true;
      newStep.subtitle = currentStep.subtitle;
      completed = false;
    }
    return formatedSteps.push(newStep);
  });
  return formatedSteps;
};

export { getSteps };
