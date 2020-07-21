import React, { Component } from "react";
import Auction from "./Auction";
import { Message } from "semantic-ui-react";
import {
  getAuctionById,
  getProviders,
  postProviders,
  getSelectedProvidersByAuctionId,
} from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";
import "moment/locale/es";

class AuctionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      selectedProviders: [],
      auction: {},
      openProviders: false,
      openFiles: false,
      notification: false,
      choosedProviders: [],
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchAuction();
      this.fetchProviders();
      this.fetchChoosedProviders();
    }
  }

  fetchAuction = async () => {
    const { id } = this.props.match.params;
    const response = await getAuctionById(id);

    if (response && response.status && response.status === 200) {
      this.setState({ auction: response.data.body });
    }
  };

  fetchProviders = async () => {
    const response = await getProviders();

    if (response && response.status === 200) {
      this.setState({ providers: response.data.body });
    }
  };

  fetchChoosedProviders = async () => {
    const { id } = this.props.match.params;
    const { token } = isAuthenticated();
    const response = await getSelectedProvidersByAuctionId(token, id);
    let choosedProviders = response.data.body; 

    if (response && response.status === 200) {
      this.setState({ choosedProviders: response.data.body });
    }
  };

  onDismissDoneNotification = () => {
    setTimeout(() => {
      this.setState({ notification: false });
    }, 5000);
    return (
      <Message
        positive
        header="Listo"
        content="Has agregado proveedores con éxito"
      />
    );
  };

  onDismissErrorNotification = () => {
    setTimeout(() => {
      this.setState({ notification: false });
    }, 5000);
    return (
      <Message
        negative
        header="Error"
        content="Ha ocurrido un error al intentar agregar proveedores"
      />
    );
  };

  submitProviders = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const { id } = this.props.match.params;
    const { providers, currentProviders } = this.state;
    const { token } = isAuthenticated();
    const sendProviders = [];
    if (currentProviders && currentProviders.length) {
      providers.forEach((item) => {
        if (currentProviders.includes(item._id)) {
          sendProviders.push(item);
        }
      });
    }

    const data = {
      auction: id,
      invitedUsers: sendProviders,
    };

    const response = await postProviders(token, data);

    if (response.data.status === 201) {
      this.onCloseProviderModal();
      this.onDismissDoneNotification();
      // fetch
    } else {
      this.onDismissErrorNotification();
    }
    this.fetchChoosedProviders();
    this.onCloseProviderModal();
  };

  onOpenProviderModal = () => {
    this.setState({
      openProviders: true,
    });
  };

  onCloseProviderModal = () => {
    this.setState({
      openProviders: false,
    });
  };

  onCloseFileModal = () => {
    this.setState({ openFiles: false });
  };

  onOpenFileModal = () => {
    this.setState({ openFiles: true });
  };

  fetchSelectedProviders = async (auctionId) => {
    const { token } = isAuthenticated();
    const response = await getSelectedProvidersByAuctionId(token, auctionId);

    if (response && response.status === 200) {
      this.setState({ selectedProviders: response.data.body });
    }
  };

  onSelectProviders = (proviers) => {
    this.setState({
      currentProviders: proviers,
    });
  };

  render() {
    const {
      auction,
      openProviders,
      openFiles,
      providers,
      selectedProviders,
      choosedProviders,
    } = this.state;

    return (
      <Auction
        auction={auction}
        providers={providers}
        openProviders={openProviders}
        selectedProviders={selectedProviders}
        openFiles={openFiles}
        onOpenProviderModal={this.onOpenProviderModal}
        onCloseProviderModal={this.onCloseProviderModal}
        onOpenFileModal={this.onOpenFileModal}
        onCloseFileModal={this.onCloseFileModal}
        onShowDescription={this.onShowDescription}
        submitProviders={this.submitProviders}
        choosedProviders={choosedProviders}
        onSelectProviders={this.onSelectProviders}
      />
    );
  }
}

export default AuctionContainer;
