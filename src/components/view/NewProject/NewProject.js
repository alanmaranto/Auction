/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Header, Card, Step } from "semantic-ui-react";
import history from "../../../modules/history/history";
import { useToasts } from "react-toast-notifications";
import { isAuthenticated } from "../../../helpers/authenticate";
import { createAuction, getRFIAuctionByUser } from "../../../api/auction";
import Overview from "./steps/Overview";
import FileList from "./steps/FileListStep";
import ItemsTable from "./steps/ItemsTable";
import ProjectDates from "./steps/ProjectDates";
import { getSteps } from './steps'

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

const NewAuction = () => {
  const { addToast } = useToasts();

  // Step 1 - Overview
  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [fileType, setFileType] = useState('buyer');
  const [auctionStep, setAuctionStep] = useState('buyer');
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpenAuction, setIsOpenAuction] = useState(true);
  const [values, setValues] = useState({
    title: "",
    identifier: "",
    description: "",
    minimumBid: null,
    finalized: false,
    extensionTime: "",
  });
  // Step 2 - Dates
  const [openingRealTimeAuctionDate, setOpeningRealTimeAuctionDate] = useState(
    ""
  );
  const [endingRealTimeAuctionDate, setEndingRealTimeAuctionDate] = useState(
    ""
  );
  const [openingRFIDate, setOpeningRFIDate] = useState("");
  const [endingRFIDate, setEndingRFIDate] = useState("");
  const [openingFADate, setOpeningFADate] = useState("");
  const [endingFADate, setEndingFADate] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [visibleDates, setVisibleDates] = useState(false);
  const [currency, setCurrency] = useState("MXN");
  // Step 3 - Items
  const [filterText, setFilterText] = useState("");
  const [items, setItems] = useState([
    {
      id: +new Date() + Math.floor(Math.random() * 999999).toString(36),
      code: "",
      name: "",
      unitMeasure: "",
      quantity: null,
      basePrice: null,
      totalPrice: null,
    },
  ]);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  // Step 4 - Files
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    title,
    description,
    minimumBid,
    identifier,
    finalized,
    extensionTime,
  } = values;
  const { token } = isAuthenticated();

  const handleUserInput = (filterText) => {
    setFilterText(filterText);
  };

  const handleItemsTable = (evt) => {
    const { id, name, value } = evt.target || {};
    let calculateTotalItemsPrice = 0;

    const newItems = [...items].map((item) => {
      if (item.id === id) {
        item[name] = value;
        if (["basePrice", "quantity"].includes(name)) {
          item.totalPrice = (item.basePrice || 0) * (item.quantity || 0);
        }
      }
      if (["basePrice", "quantity"].includes(name)) {
        calculateTotalItemsPrice +=
          (item.basePrice || 0) * (item.quantity || 0);
      }
      return item;
    });
    setItems(newItems);
    setTotalItemsPrice(calculateTotalItemsPrice);
  };

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const fetchRFIAuctions = async () => {
    const response = await getRFIAuctionByUser(token);

    if (response && response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bodyData = new FormData();

    fileList.forEach((file) => {
      bodyData.append("files", file);
    })
    bodyData.append("items", JSON.stringify(items));
    bodyData.append("openingRealTimeAuctionDate", openingRealTimeAuctionDate);
    bodyData.append("endingRealTimeAuctionDate", endingRealTimeAuctionDate);
    bodyData.append("extendedRealTimeAuctionDate", endingRealTimeAuctionDate);
    bodyData.append("openingRFIDate", openingRFIDate);
    bodyData.append("endingRFIDate", endingRFIDate);
    bodyData.append("openingFADate", openingFADate);
    bodyData.append("endingFADate", endingFADate);
    bodyData.append("isPrivate", isPrivate);
    bodyData.append("visibleDates", visibleDates);
    bodyData.append("currency", currency);
    bodyData.append("totalItemsPrice", totalItemsPrice);
    bodyData.append("isOpenAuction", true);
    bodyData.append("title", title);
    bodyData.append("description", description);
    bodyData.append("minimumBid", minimumBid);
    bodyData.append("identifier", identifier);
    bodyData.append("finalized", finalized);
    bodyData.append("extensionTime", extensionTime);
    bodyData.append("fileType", fileType);
    bodyData.append("auctionStep", auctionStep);

    if (
      !title ||
      !openingRealTimeAuctionDate ||
      !endingRealTimeAuctionDate ||
      !minimumBid
    ) {
      addToast("Debes llenar los campos obligatorios", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      const response = await createAuction(token, bodyData);

      if (response.status === 201) {
        setLoading(false);
        fetchRFIAuctions();
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
            openingRFIDate={openingRFIDate}
            endingRFIDate={endingRFIDate}
            setOpeningRFIDate={setOpeningRFIDate}
            setEndingRFIDate={setEndingRFIDate}
            openingFADate={openingFADate}
            endingFADate={endingFADate}
            setOpeningFADate={setOpeningFADate}
            setEndingFADate={setEndingFADate}
            openingRealTimeAuctionDate={openingRealTimeAuctionDate}
            endingRealTimeAuctionDate={endingRealTimeAuctionDate}
            setOpeningRealTimeAuctionDate={setOpeningRealTimeAuctionDate}
            setEndingRealTimeAuctionDate={setEndingRealTimeAuctionDate}
          />
        );
      case 2:
        return (
          <ItemsTable
            filterText={filterText}
            items={[...items]}
            handleUserInput={handleUserInput}
            setItems={setItems}
            handleItemsTable={handleItemsTable}
            totalItemsPrice={totalItemsPrice}
            currency={currency}
          />
        );
      case 3:
        return (
          <FileList
            fileList={fileList}
            setFileList={setFileList}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
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
            isOpenAuction={isOpenAuction}
            setIsOpenAuction={setIsOpenAuction}
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
        <Step.Group size="mini" fluid stackable="tablet" items={getSteps(currentStep)} />
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
