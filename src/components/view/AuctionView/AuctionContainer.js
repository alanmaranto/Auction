import React, { Component } from "react";
import Auction from "./Auction";
import { Message } from 'semantic-ui-react'
import { getAuctionById, getProviders, postProviders } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";
import "moment/locale/es";

class AuctionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      auction: {},
      openProviders: false,
      openFiles: false,
      notification: false,
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchAuction();
      this.fetchProviders();
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

  onDismissDoneNotification = () => {
    setTimeout(() => {
      this.setState({ notification: false })
    }, 5000)
    return (
      <Message positive
        header="Listo"
        content="Has agregado proveedores con éxito"
      />
    )
  }

  onDismissErrorNotification = () => {
    setTimeout(() => {
      this.setState({ notification: false })
    }, 5000)
    return (
      <Message negative
        header="Error"
        content="Ha ocurrido un error al intentar agregar proveedores"
      />
    )
  }

  submitProviders = async (e) => {
    if (e) {
      e.preventDefault()
    }
    const { id }= this.props.match.params;
    const { providers } = this.state
    const { token } = isAuthenticated();

    const data = {
      auction: id,
      invitedUsers: providers,
    };

    const response = await postProviders(token, data)

    if (response.data.status === 201) {
      this.onCloseProviderModal()
      this.onDismissNotification()
      // fetch
    } else {
      this.onDismissNotification()
    }
    console.log('resp data',response)
  }

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

  render() {
    const { auction, openProviders, openFiles, providers } = this.state;
    
    return (
      <Auction
        auction={auction}
        providers={providers}
        openProviders={openProviders}
        openFiles={openFiles}
        onOpenProviderModal={this.onOpenProviderModal}
        onCloseProviderModal={this.onCloseProviderModal}
        onOpenFileModal={this.onOpenFileModal}
        onCloseFileModal={this.onCloseFileModal}
        onShowDescription={this.onShowDescription}
        submitProviders={this.submitProviders}
      />
    );
  }
}

export default AuctionContainer;
