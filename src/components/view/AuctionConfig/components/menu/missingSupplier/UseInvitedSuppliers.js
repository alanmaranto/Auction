/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { isAuthenticated } from "../../../../../../helpers/authenticate";
import {
  getMissingSuppliersByAuction,
  inviteSupplier,
} from "../../../../../../api/api";

export const getFavoriteMissingSuppliers = async (options) => {
  const { token } = isAuthenticated();
  if (token) {
    const response = await getMissingSuppliersByAuction(
      token,
      options.auctionId
    );
    if (response && response.status && response.status === 200) {
      return response.data.body;
    }
  }
  return {};
};

export const putSupplier = async (options) => {
  const { token } = isAuthenticated();
  if (token) {
    const response = await inviteSupplier(
      token,
      options.auctionId,
      options.userId
    );
    if (response && response.status && response.status === 200) {
      return response.data.body;
    }
  }
  return {};
};

export const useSuppliers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplliers, setData] = useState([]);

  const fetchFavoriteMissingSuppliers = async (options = {}) => {
    try {
      setIsLoading(true);
      const { auctionId } = options;
      if (auctionId) {
        const supplliers = (await getFavoriteMissingSuppliers(options)) || {};
        setData(supplliers);
        setIsLoading(false);
        return supplliers;
      }
      setIsLoading(false);
      return [];
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  const inviteSupplier = async (options = {}) => {
    try {
      setIsLoading(true);
      const { auctionId, userId } = options;
      if ((auctionId, userId)) {
        const supplierResult = (await putSupplier(options)) || false;
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch {}
  };

  return {
    isLoading,
    error,
    supplliers,
    fetchSuppliers: useCallback(fetchFavoriteMissingSuppliers, []),
    inviteSupplier: useCallback(inviteSupplier, []),
  };
};
