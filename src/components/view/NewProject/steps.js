const getSteps = (currentStep) => {
  const steps = [
    {
      key: "Overview",
      icon: "info circle",
      title: "Información General",
      active: currentStep === 0 ? true : false,
      description: "Completa la información",
    },
    {
      key: "Dates",
      active: currentStep === 1 ? true : false,
      icon: "calendar alternate",
      description: "Selecciona las fechas",
      title: "Fechas",
    },
    {
      key: "ItemsTable",
      active: currentStep === 2 ? true : false,
      icon: "unordered list",
      title: "Artículos a subastar",
      description: "Elige tus artículos",
    },
    {
      key: "Files Invitation",
      icon: "file excel",
      title: "Documentos de invitación",
      active: currentStep === 3 ? true : false,
      description: "Agrega documentos necesarios",
    },
  ];
  return steps;
};

module.exports = {
  getSteps,
};
