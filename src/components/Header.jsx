import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Button, Tooltip, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Row from 'reactstrap/lib/Row';


class Header extends Component {

  state = {
    tooltipOpen: false
  }

  static propTypes = {
    handleAdd: PropTypes.func
  }

  render() {

    return (
      <div className="header">
        <Row>
          <Col xs="8">
            <h1 className="main-title">Ranking de universidades</h1>
          </Col>
          <Col xs="4"className="d-flex justify-content-around">
            <Button outline color="secondary" onClick={() => this.props.handleAdd("uni")}><FontAwesomeIcon icon={faPlus} /> Universidade</Button>
            <Button outline color="secondary" onClick={() => this.props.handleAdd("course")}><FontAwesomeIcon icon={faPlus} /> Curso</Button>
            <Button outline color="secondary" onClick={() => this.props.handleAdd("grade")}><FontAwesomeIcon icon={faPlus} /> Nota</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header