const steps = [
  {
    value: "rfi",
    display: "RFI",
    subtitle: "Propuesta técnica y registro de inventarios",
  },
  {
    value: "fa_hl",
    display: "FA/HL",
    subtitle: "Foro Aclaraciones / Propuesta Técnica",
  },
  {
    value: "sub",
    display: "SUB",
    subtitle: "Suministros y Ulala",
  },
];

const getNextStep = (currentStep) => {
  let currentStepIndex = 0;
  steps.forEach((element, index) => {
    if (element.value === currentStep) {
      currentStepIndex = index;
    }
  });

  if (currentStepIndex === steps.length - 1) {
    return false;
  }
  return steps[currentStepIndex + 1].display;
};

const getAcceptedSuppliers = (suppliers) => {
  if (suppliers) {
    return suppliers.filter((supplier) => supplier.status === "accepted");
  }
  return [];
};

export { steps, getNextStep, getAcceptedSuppliers };
