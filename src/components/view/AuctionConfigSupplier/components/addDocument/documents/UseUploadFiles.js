import { useState } from "react";
import { postFile } from "../../../../../../api/api";
import { isAuthenticated } from "../../../../../../helpers/authenticate";

export const useUploadFiles = ({ onClose, fetchAuction }) => {
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onAddFile = (files) => {
    const currentFileList = [...fileList];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        currentFileList.push(file);
      });
    } else {
      currentFileList.push(files);
    }
    setFileList(currentFileList);
  };

  const onRemoveFile = (index) => {
    const currentFileList = [...fileList];
    currentFileList.splice(index, 1);

    setFileList(currentFileList);
  };

  const onCloseUploadFile = () => {
    setFileList([]);
    if (onClose) onClose();
  };

  const onSaveFiles = async (event, { auctionId, auctionStep, fileType }) => {
    setIsUploading(true);
    if (event) {
      event.preventDefault();
    }

    const requestBody = new FormData();
    const { token, user } = isAuthenticated();

    requestBody.append("userId", user._id);
    requestBody.append("auctionStep", auctionStep);
    requestBody.append("fileType", fileType);
    fileList.forEach((file) => {
      requestBody.append("files", file);
    });
    const response = await postFile(token, requestBody, auctionId);
    if (response && response.status === 201) {
      setIsUploading(false);
      fetchAuction();
      onCloseUploadFile();
      return true;
    } else {
      onCloseUploadFile();
      return false;
    }
  };

  return {
    fileList,
    onAddFile,
    onRemoveFile,
    onCloseUploadFile,
    onSaveFiles,
    isUploading,
  };
};
