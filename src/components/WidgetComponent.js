import React, { Component } from "react";
import {Button, Col, Label, Row} from "reactstrap";
import { Control, Form } from "react-redux-form";
import {Link, useNavigate} from "react-router-dom";
import * as IoIcons from "react-icons/io";

class Widget extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.postSettings(values);
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="widget-content">
            <div className="return-button">
              <Link to="/session" className="primary-button"><IoIcons.IoIosArrowBack /> Session</Link>
            </div>
            <div className="widget-settings">
              <Form model="widget" onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="alignment" md={2}>Alignment</Label>
                  <Col md={6}>
                    <Control.select model=".alignment" id="alignment">
                      <option value="Row">Row</option>
                      <option value="Column">Column</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="backgroundColor" md={2}>Background Color</Label>
                  <Col md={3}>
                    <Control type="color" model=".backgroundColor" id="backgroundColor" name="backgroundColor"
                             className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="textColor" md={2}>Text Color</Label>
                  <Col md={3}>
                    <Control type="color" model=".textColor" id="textColor" name="textColor" className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="fontSize" md={2}>Font Size</Label>
                  <Col md={3}>
                    <Control.text model=".fontSize" id="fontSize" name="fontSize" type="number"
                                  className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="battleText" md={2}>Battle Text</Label>
                  <Col md={3}>
                    <Control.text model=".battleText" id="battleText" name="battleText"
                                  className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="damageText" md={2}>Damage Text</Label>
                  <Col md={3}>
                    <Control.text model=".damageText" id="damageText" name="damageText"
                                  className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="winrateText" md={2}>Winrate Text</Label>
                  <Col md={3}>
                    <Control.text model=".winrateText" id="winrateText" name="winrateText"
                                  className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="fontFamily" md={2}>Font Family</Label>
                  <Col md={3}>
                    <Control.select model=".fontFamily" id="fontFamily">
                      <option value="Arial">Arial</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Helvatica">Helvatica</option>
                      <option value="Tahoma">Tahoma</option>
                      <option value="Trebuchet MS">Trebuchet MS</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Garamond">Garamond</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Century Gothic">Century Gothic</option>
                      <option value="Impact">Impact</option>
                    </Control.select>
                  </Col>
                </Row>
                <div className="widget-bottom-buttons">
                  <Button className="primary-button">Save Configuration</Button>
                </div>
              </Form>
            </div>
            <div className="user-information" style={{flexDirection: this.props.widget.alignment,
                                                      backgroundColor: this.props.widget.backgroundColor,
                                                      color: this.props.widget.textColor,
                                                      fontSize: this.props.widget.fontSize + 'px'
            }}>
              <div className="battles">
                <span style={{fontFamily: this.props.widget.fontFamily}}>{this.props.widget.battleText}: 0</span>
              </div>
              <div className="damage">
                <span style={{fontFamily: this.props.widget.fontFamily}}>{this.props.widget.damageText}: 0</span>
              </div>
              <div className="winrate">
                <span style={{fontFamily: this.props.widget.fontFamily}}>{this.props.widget.winrateText}: 0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Widget;
