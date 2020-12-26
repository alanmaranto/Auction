import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { getFavoriteSuppliers } from "../../../../api/favoriteSuppliers";
import { isAuthenticated } from "../../../../helpers/authenticate";
import FavoriteSupplierItem from "../FavoriteSupplierListItem";

const InvitationFiles = ({ values, invitedSuppliers, setInvitedSuppliers }) => {
  console.log("invitedSuppliers", invitedSuppliers);
  const [favoriteSuppliers, setFavoriteSuppliers] = useState([]);

  console.log(values);

  const { token, user } = isAuthenticated();

  const fetchFavoriteSuppliers = async () => {
    const data = await getFavoriteSuppliers(token);
    console.log(data);
    if (data.status === 200) {
      setFavoriteSuppliers(data.data.body);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchFavoriteSuppliers();
    }
  }, []);

  const onAddSupplier = (supplierId) => {
    console.log("id", supplierId);
    invitedSuppliers.push(supplierId);
  };

  return (
    <>
      <div>
        <List divided verticalAlign="middle">
          {favoriteSuppliers.map(({ _id, favoriteSuppliers }) => (
            <FavoriteSupplierItem
              key={_id}
              id={favoriteSuppliers._id}
              name={favoriteSuppliers.name}
              logo={
                favoriteSuppliers.logoUrl
                  ? favoriteSuppliers.logoUrl
                  : "https://react.semantic-ui.com/images/avatar/small/lena.png"
              }
              onAddSupplier={onAddSupplier}
            />
          ))}
        </List>
      </div>
    </>
  );
};

export default InvitationFiles;
