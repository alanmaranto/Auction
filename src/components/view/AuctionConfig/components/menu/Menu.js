import React, { useState } from "react";
import { Accordion, Menu } from "semantic-ui-react";
import MissingSuppliers from "./missingSupplier/MissingSupplier";
import Documents from "./documents/Documents";

import "./style.css";

const MenuInvited = ({ auctionId, fetchAuction }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Accordion
        as={Menu}
        vertical
        className="menu-items"
        style={{ width: "100%" }}
      >
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Documentos"
            index={0}
            onClick={() => setActiveIndex(0)}
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={<Documents />}
          />
        </Menu.Item>
      </Accordion>

      <Accordion
        as={Menu}
        vertical
        className="menu-items"
        style={{ width: "100%" }}
      >
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content="Invitados"
            index={1}
            onClick={() => setActiveIndex(1)}
          />
          <Accordion.Content
            active={activeIndex === 1}
            content={
              <MissingSuppliers
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
              />
            }
          />
        </Menu.Item>
      </Accordion>
    </>
  );
};

export default MenuInvited;
