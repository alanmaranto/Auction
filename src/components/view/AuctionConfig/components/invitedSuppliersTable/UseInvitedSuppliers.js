/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { isAuthenticated } from "../../../../../helpers/authenticate";
import {
  putRejectSupplier,
  putAcceptSupplier,
  postInvitationDocuments,
} from "../../../../../api/api";

const updateInvitation = async (options) => {
  const { token } = isAuthenticated();
  if (token && options?.auctionId) {
    const response = options?.reject
      ? await putRejectSupplier(token, options)
      : await putAcceptSupplier(token, options);

    if (response?.status && response?.status === 200) {
      return response.data.body;
    }
  }
  return {};
};
const sendDocuments = async (options) => {
  const { token } = isAuthenticated();
  if (token) {
    const response = await postInvitationDocuments(token, options);
    if (response?.status && response?.status === 200) {
      return response.data.body;
    }
  }
  return {};
};

export const useInvitedSupplier = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setData] = useState(false);

  const rejectUser = async (options = {}) => {
    try {
      setIsLoading(true);
      const supplierResult =
        (await updateInvitation({ ...options, reject: true })) || {};
      setData(true);
      setIsLoading(false);
      return true;
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  const acceptUser = async (options = {}) => {
    try {
      setIsLoading(true);
      const supplierResult = (await updateInvitation(options)) || {};
      setData(true);
      setIsLoading(false);
      return true;
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  const sendInvitationDocuments = async (options = {}) => {
    try {
      setIsLoading(true);
      const supplierResult = (await sendDocuments(options)) || {};
      setIsLoading(false);
      return supplierResult;
    } catch (e) {
      setIsLoading(false);
      setError(e);
      throw e;
    }
  };

  return {
    isLoading,
    error,
    status,
    rejectSupplier: useCallback(rejectUser, []),
    acceptSupplier: useCallback(acceptUser, []),
    sendInvitationDocuments: sendInvitationDocuments,
  };
};
