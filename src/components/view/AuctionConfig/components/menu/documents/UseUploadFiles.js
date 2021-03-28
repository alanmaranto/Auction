import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { postFile } from "../../../../../../api/api";
import { isAuthenticated } from "../../../../../../helpers/authenticate";

export const useUploadFiles = ({ onClose, fetchAuction }) => {
  const { addToast } = useToasts()
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
      addToast("Archivos guardados con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      return true;
    } else {
      onCloseUploadFile();
      addToast("Hubo un error al guardar los archivos", {
        appearance: "error",
        autoDismiss: true,
      });
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
