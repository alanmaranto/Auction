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
  console.log('sucrrente', currentStep)
  let currentStepIndex = 0;
  steps.forEach((element, index) => {
    console.log('index', index)
    console.log('for each')
    if (element.value === currentStep) {
      console.log('2')
      currentStepIndex = index;
    }
  });

  console.log('soy el currentStepIndex', currentStepIndex)

  console.log('length',steps.length)

  if (currentStepIndex === steps.length - 1) {
    console.log('currentStepIndex', currentStepIndex)
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
