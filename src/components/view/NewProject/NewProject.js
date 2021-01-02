import React, { useState } from "react";
import { Button, Header, Card, Step } from "semantic-ui-react";
import history from "../../../modules/history/history";
import { useToasts } from "react-toast-notifications";
import { isAuthenticated } from "../../../helpers/authenticate";
import { createAuction } from "../../../api/auction";
import { getActiveAuctionsByUser } from "../../../api/auction";
import Overview from "./steps/Overview";
import FileList from "./steps/FileListStep";
import ItemsTable from "./steps/ItemsTable";
import ProjectDates from "./steps/ProjectDates";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

const NewAuction = () => {
  const { addToast } = useToasts();

  // Step 1 - Overview
  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [source, setSource] = useState("PROJECT");
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
  const [visibleDates, setVisibleDates] = useState(true);
  const [currency, setCurrency] = useState("mxn");

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
  const [totalItemsPrice, setTotalItemsPrice] = useState(5500);

  // Step 4 - Files
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { title, description, minimumBid } = values;
  const { token } = isAuthenticated();

  const handleUserInput = (filterText) => {
    setFilterText(filterText);
  };

  const handleRowDel = (item) => {
    const index = items.indexOf(item);
    items.splice(index, 1);
    setItems(items);
  };

  const handleAddRow = (evt) => {
    console.log("s");
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const itemRow = {
      id,
      code: "",
      name: "",
      unitMeasure: "",
      quantity: null,
      basePrice: null,
      totalPrice: null,
    };

    items.push(itemRow);
    setItems(items);
  };

  const handleItemsTable = (evt) => {
    const eventItem = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    const itemsSlice = items.slice();
    console.log(itemsSlice);
    const newItems = itemsSlice.map((item) => {
      for (var key in item) {
        if (key === eventItem.name && item.id === eventItem.id) {
          // Aqui va logica para evaluar quantity * basePrice y set
          // the item.totalPrice con ese valor
          if (eventItem.name === "quantity") {
            console.log("SETEAR TOTALPRICE");
          }
          if (eventItem.name === "basePrice") {
            console.log("SETEAR TOTALPRICE");
          }
          item[key] = eventItem.value;
        }
      }
      return item;
    });
    setItems(newItems);
  };

  const onAddFile = (files) => {
    const currentFileList = [...fileList];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        console.log("file", file);
        currentFileList.push(file);
      });
    } else {
      currentFileList.push(files);
    }
    console.log("setting archivos", files);
    setFileList(currentFileList);
  };

  const onRemoveFile = (index) => {
    const currentFileList = [...fileList];
    currentFileList.splice(index, 1);

    setFileList(currentFileList);
  };

  const fileNames = fileList && fileList.map((file) => file.name);

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
    setLoading(true);

    const auction = {
      ...values,
      openingRealTimeAuctionDate,
      endingRealTimeAuctionDate,
      openingRFIDate,
      endingRFIDate,
      openingFADate,
      endingFADate,
      isPrivate,
      visibleDates,
      currency,
      totalItemsPrice,
      items,
      source,
    };

    console.log("submitAuction", auction);

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
      // Instancear new formdata
      // const requestBody = new FormData();

      // Agregar los valores del objeto y enviarlo en el formdata
      // requestBody.append("source", source);

      // Recorrer los files y hacer un append hacia el form data
      /*
      fileList.forEach((file) => {
        requestBody.append("files", file);
      });
      */

      // Enviar el formdata en vez del auction
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
            items={items}
            handleUserInput={handleUserInput}
            handleRowDel={handleRowDel}
            handleAddRow={handleAddRow}
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
            onAddFile={onAddFile}
            onRemoveFile={onRemoveFile}
            // fileNames={fileNames}
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
      key: "Files Invitation",
      icon: "file excel",
      title: "Documentos de invitación",
      active: currentStep === 3 ? true : false,
      description: "Agrega documentos necesarios",
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
