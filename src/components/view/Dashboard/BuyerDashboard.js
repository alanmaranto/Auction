import React from "react";
import { Button, Dimmer, Header, Segment, Icon, Card, Image } from 'semantic-ui-react';
import Navbar from "../../../core/Navbar/Navbar";

const test = () => {

    return (
      
      <div>
        <Dimmer.Dimmable as={Segment}>
          <Header as='h3'>Overlayable Section</Header>
          <Image.Group size='small' className='ui small images'>
            <Image src='/images/wireframe/image.png' />
            <Image src='/images/wireframe/image.png' />
            <Image src='/images/wireframe/image.png' />
          </Image.Group>
          <Image size='medium' src='/images/wireframe/media-paragraph.png' />

          <Dimmer onClickOutside={this.handleHide} />
        </Dimmer.Dimmable>

        <Button.Group>
          <Button icon='plus' onClick={this.handleShow} />
          <Button icon='minus' onClick={this.handleHide} />
        </Button.Group>
      </div>
    )
}

const Buyer = () => {
  return (
    <div >
      <Card>
      <Image src="https://gravatar.com/avatar/" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
    <Card>
      <Image src="https://gravatar.com/avatar/" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
    <Card>
      <Image src="https://gravatar.com/avatar/" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
    <Card>
      <Image src="https://gravatar.com/avatar/" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
    <Card>
      <Image src="https://gravatar.com/avatar/" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
    {test()}
    </div>
  )
};

export default Buyer;
