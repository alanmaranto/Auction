import React, { Component } from 'react';
import RunningAuction from './RunningAuction';

import { getAuctionById } from "../../../api";
import { socket } from '../../../socket';

class RunningAuctionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
			message: "",
			messages: [],
			Auction:{},
    };
  }

  componentDidMount = () => {
		this.fetchAuction();
		this.listenMessages();
	};

	fetchAuction = async () => {
		
		const { id: currentAuction } = this.props.match.params;
 		const id=currentAuction || "5ecc5364868c2f0361e9c767";
		const response = await getAuctionById(id);

    if (response && response.data && response.data.body) {
			this.setState({Auction: response.data.body });
    }
	}

	listenMessages = () => {
    socket.on('GetNewMessages', (data) => {
			// Make validation if messages belongs to current auction
			// if(data.auctionId === Auction.id)
      this.setState(
        {
          messages: data.messages,
        },
      );
    });
  };

	onChange = (param, value) => {
   this.setState({[param]: value});
	}

	onSubmit = ()=>{
		const { message } = this.state;
		// Send to API and emit GetNewMessages at API
	}

  render() {
		const {Auction, message} = this.state;
    return (
      <RunningAuction
				title={Auction.title}
				onChange={this.onChange}
				message={message}
				onSubmit={this.onSubmit}
      />
    );
  }
}

export default RunningAuctionView;
