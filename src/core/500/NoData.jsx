import React, { Fragment } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { Row, Column, HContent } from "../indexSemanticUi";
import NoContent from "../../assets/no_content.svg";
import "./style.css";

const NoData = ({
  title,
  size,
  className,
  color,
  textAlign,
  headerText,
  classNameHeader,
  headerConfig,
  classNameImg,
}) => {
  return (
    <Fragment>
      <Grid className={className ? className : "no-data"} container>
        <Row>
          <Column>
            <Header
              as={headerText ? headerText : "h2"}
              textAlign={textAlign ? textAlign : "center"}
              color={color ? color : "blue"}
              className={classNameHeader ? classNameHeader : "no-data-header"}
              style={headerConfig ? headerConfig : { padding: "1.2em 0" }}
            >
              <HContent>{title}</HContent>
            </Header>
            <Image
              centered
              size={size}
              src={NoContent}
              className={classNameImg ? classNameImg : "no-image-class"}
            />
          </Column>
        </Row>
      </Grid>
    </Fragment>
  );
};

export default NoData;
