import React from "react";
import PropTypes from "prop-types";
import { Form, Popup } from "semantic-ui-react";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

export class AuctionFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      filterValid: true,
    };
  }

  handleOnChange = (event, { name, value }) => {
    if (value !== "" && !regex.test(value)) {
      this.setState({ [name]: value, filterValid: false });
    } else {
      this.setState({ [name]: value, filterValid: true });
      this.props.onChangeValue(value);
    }
  };

  render() {
    const { filter, filterValid, totalCount } = this.state;
    let popupMessage = "";
    if (!filterValid) {
      popupMessage = "Invalid character.";
    } else if (this.props.totalCount === 0) {
      popupMessage = "No results found.";
    }

    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Popup
              trigger={
                <Form.Input
                  placeholder="Enter the filter."
                  name="filter"
                  value={filter}
                  error={!filterValid}
                  label="Filter"
                  onChange={this.handleOnChange}
                  icon="search"
                  loading={this.props.loading}
                />
              }
              content={popupMessage}
              on="click"
              open={!filterValid || totalCount === 0}
              position="right center"
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

AuctionFilter.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};
