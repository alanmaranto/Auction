/* eslint-disable no-unused-vars */
import { useState } from "react";
import { isAuthenticated } from "../../../../../helpers/authenticate";
import { putAuctionStep } from "../../../../../api/api";

const putAuction = async (options) => {
  const { token } = isAuthenticated();
  if (token && options?.auctionId) {
    const response = await putAuctionStep(token, options);
    if (response?.status && response?.status === 200) {
      return response.data.body;
    }
  }
  return {};
};

export const UseMoveToStep = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setData] = useState(false);

  const moveToNextStep = async (options = {}) => {
    try {
      setIsLoading(true);
      const updatedAcution = (await putAuction(options)) || {};
      setData(true);
      setIsLoading(false);
      return true;
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  return {
    isLoading,
    error,
    status,
    moveToNextStep,
  };
};
