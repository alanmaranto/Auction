import React, { useState } from "react";
import { Button, Header, Card, Step } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "../../../modules/history/history";
import { useToasts } from "react-toast-notifications";
import { isAuthenticated } from "../../../helpers/authenticate";
import { createAuction } from "../../../api/auction";
import { getActiveAuctionsByUser } from "../../../api/auction";
import Overview from "./Overview";
import InvitationFiles from "./InvitationFiles";
import ItemsTable from "./ItemsTable";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import ProjectDates from "./ProjectDates";

const NewAuction = () => {
  const { addToast } = useToasts();

  const [openingAuctionProjectDate, setOpeningAuctionProjectDate] = useState(
    ""
  );
  const [endingAuctionProjectDate, setEndingAuctionProjectDate] = useState("");
  const [openingRFIDate, setOpeningRFIDate] = useState("");
  const [endingRFIDate, setEndingRFIDate] = useState("");
  const [openingFADate, setOpeningFADate] = useState("");
  const [endingFADate, setEndingFADate] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [visibleDates, setVisibleDates] = useState(true);
  const [currency, setCurrency] = useState("mxn");

  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    title: "",
    identifier: "",
    description: "",
    // minimunPrice: null,
    minimumBid: null,
    finalized: false,
    error: "",
    redirectToAuction: false,
    createdAuction: "",
    extensionTime: "",
  });

  const { title, description, minimumBid /* minimunPrice */ } = values;
  const { token } = isAuthenticated();

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const fetchActiveAuctions = async () => {
    const response = await getActiveAuctionsByUser(token);

    if (response && response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, error: "" });

    setLoading(true);

    const auction = {
      ...values,
      openingAuctionProjectDate,
      endingAuctionProjectDate,
      isPrivate,
      visibleDates,
    };

    if (
      !title ||
      !openingAuctionProjectDate ||
      !endingAuctionProjectDate ||
      !minimumBid
    ) {
      addToast("Debes llenar los campos obligatorios", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      const response = await createAuction(token, auction);

      if (response.status === 201) {
        setLoading(false);
        fetchActiveAuctions();
        addToast("Subasta creada exitósamente", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/`);
      } else {
        addToast("Hubo un error al crear la subasta", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectDates
            onChange={onChange}
            visibleDates={visibleDates}
            setVisibleDates={setVisibleDates}
            openingAuctionProjectDate={openingAuctionProjectDate}
            endingAuctionProjectDate={endingAuctionProjectDate}
            setOpeningAuctionProjectDate={setOpeningAuctionProjectDate}
            setEndingAuctionProjectDate={setEndingAuctionProjectDate}
            openingRFIDate={openingRFIDate}
            endingRFIDate={endingRFIDate}
            setOpeningRFIDate={setOpeningRFIDate}
            setEndingRFIDate={setEndingRFIDate}
            openingFADate={openingFADate}
            endingFADate={endingFADate}
            setOpeningFADate={setOpeningFADate}
            setEndingFADate={setEndingFADate}
            extensionTime={values.extensionTime}
          />
        );
      case 2:
        return <ItemsTable values={values} onChange={onChange} />;
      case 3:
        return (
          <InvitationFiles
            values={values}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        );
      default:
        return (
          <Overview
            values={values}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            onChange={onChange}
            currency={currency}
            setCurrency={handleChangeCurrency}
          />
        );
    }
  };

  const renderStepButtons = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <Button onClick={prevStep}>Regresar </Button>
            <Button onClick={nextStep}>Guardar y continuar </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <Button onClick={prevStep}>Regresar </Button>
            <Button onClick={nextStep}>Guardar y continuar </Button>
          </div>
        );
      case 3:
        return (
          <div>
            <Button onClick={prevStep}>Regresar </Button>
            <Button onClick={onSubmit}>Terminar proyecto </Button>
          </div>
        );
      default:
        return (
          <div>
            <Button onClick={nextStep}>Guardar y continuar </Button>
          </div>
        );
    }
  };

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
      key: "Invitation Providers",
      icon: "user plus",
      title: "Invitar Proveedores",
      active: currentStep === 3 ? true : false,
      description: "Añade tus proveedores",
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChangeCurrency = (event, { value: currency }) =>
    setCurrency(currency);

  return (
    <>
      <div>
        <Header textAlign="left" style={{ color: "#142850", fontSize: "2em" }}>
          Información general del proyecto
        </Header>
        <Step.Group size="mini" fluid stackable="tablet" items={steps} />
      </div>
      <Card fluid>
        <Card.Content>
          <div className="new-project-card-content">{renderActiveStep()}</div>
          <div>{renderStepButtons()}</div>
        </Card.Content>
      </Card>
    </>
  );
};

export default NewAuction;
