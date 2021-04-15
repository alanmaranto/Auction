const steps = [
  {
    value: "rfi",
    display: "RFI",
    subtitle: "Solicitud de información",
  },
  {
    value: "fa_hl",
    display: "FA/PT",
    subtitle: "Foro Aclaraciones / Propuesta Técnica",
  },
  {
    value: "sub",
    display: "SUB",
    subtitle: "En espera de la subasta",
  },
];

const getNextStep = (currentStep) => {
  let currentStepIndex = 0;
  steps.forEach((element, index) => {
    if (element.value === currentStep) {
      currentStepIndex = index;
    }
  });

  if (currentStepIndex === steps.length) {
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
