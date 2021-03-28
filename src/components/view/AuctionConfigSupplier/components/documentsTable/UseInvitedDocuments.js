/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { useState } from "react";
import { isAuthenticated } from "../../../../../helpers/authenticate";
import { putInvitationDocuments } from "../../../../../api/api";

const updateDocument = async (options) => {
  const { token } = isAuthenticated();
  if (token) {
    const response = await putInvitationDocuments(token, options);
    if (response?.status && response?.status === 200) {
      return response.data.body;
    }
  }
  return {};
};

export const useDocuments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteDocument = async (options = {}) => {
    try {
      return true;
    } catch (e) {
      setError(e);
      throw e;
    }
  };

  const readDocument = async (options = {}) => {
    try {
      const documentResult =
        (await updateDocument({ ...options, step: "read" })) || {};
      return documentResult;
    } catch (e) {
      setError(e);
      throw e;
    }
  };

  return {
    isLoading,
    error,
    deleteDocument,
    readDocument,
  };
};
