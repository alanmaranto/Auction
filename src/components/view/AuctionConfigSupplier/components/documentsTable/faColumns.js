import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";

const buyerColumns = ({ onHandleReadDocument }) => {
  return [
    [
      {
        id: "A",
        name: "documents",
        title: "Documentos del comprador",
        colSpan: 2,
        isHeader: true,
      },
    ],
    [
      {
        id: "1",
        name: "documents",
        title: "Nombre del documento",
        width: 2,
        renderData: (dataRow) => {
          const { title } = dataRow || {};
          return <div>{title || ""}</div>;
        },
      },
      {
        id: "7",
        name: "actions",
        title: "",
        width: "two",
        textAlign: "right",
        renderData: (dataRow) => {
          const { url } = dataRow || {};
          return (
            <>
              <Popup
                content="Al descargar este documento, el Comprador será informado que usted ha leído estos archivos"
                trigger={
                  <Button
                    icon
                    onClick={() => {
                      onHandleReadDocument(dataRow);
                      window.location.href = url;
                    }}
                  >
                    <Icon name="cloud download" color="blue" />
                  </Button>
                }
              />
            </>
          );
        },
      },
    ],
  ];
};

const faColumns = ({
  isSupplier,
  onHandleReadDocument,
  onHandleDeleteDocument,
}) => {
  if (isSupplier) {
    return [
      [
        {
          id: "A",
          name: "documents",
          title: "Mis documentos",
          colSpan: 2,
          isHeader: true,
        },
      ],
      [
        {
          id: "1",
          name: "documents",
          title: "Nombre del documento",
          renderData: (dataRow) => {
            const { title } = dataRow || {};
            return <div>{title}</div>;
          },
        },
        {
          id: "7",
          name: "actions",
          title: "",
          rowSpan: 2,
          textAlign: "right",
          renderData: (dataRow) => {
            const { url } = dataRow || {};
            return (
              <>
                <Popup
                  content="Descargar documento"
                  trigger={
                    <Button
                      icon
                      onClick={() => {
                        window.location.href = url;
                      }}
                    >
                      <Icon name="cloud download" color="blue" />
                    </Button>
                  }
                />
              </>
            );
          },
        },
      ],
    ];
  }

  return buyerColumns({
    onHandleReadDocument,
    onHandleDeleteDocument,
  });
};

export default faColumns;
