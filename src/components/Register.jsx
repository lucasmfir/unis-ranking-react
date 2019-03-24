import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Label, Input, Button } from 'reactstrap';

class Register extends Component {

  state = {
    type: null,
    label: null,
    value: '',
    invalid: false
  }

  static propTypes = {
    type: PropTypes.string,
    handleSave: PropTypes.string
  }

  componentWillMount() {
    this.handleChange = this.handleChange.bind(this);
    
    const { type } = this.props
    let label = this.setLabel(type)
    this.setState({ type, label })
  }

  componentDidUpdate() {
    const type = this.props.type
    if(type != this.state.type){
      let label = this.setLabel(type)
      this.setState({type, label, value: ''})
    }
  }

  setLabel = (type) => {
    if(type === "uni")
      return "Universidade"
    else if(type === "course")
      return "Curso"
  }

  onSave = () => {
    const { value, type } = this.state

    if(value.length){
      this.setState({invalid:false, value:''}, () => this.props.handleSave(type, value))
    } else {
      this.setState({invalid: true})
    }
  } 
  
  handleChange(e) {
    const value = e.target.value
    this.setState({value});
  }

  render() {
    const { type, label, value, invalid } = this.state
    return (
      type && label ? (
        <div>
          <Label className="mt-2" for="field">{label}</Label>
          <Input
            invalid={invalid}
            type="text" 
            name="field" 
            id="field" 
            value={value} 
            onChange={this.handleChange}
          />
          <br/>
          <Button outline color="success" onClick={this.onSave}>Salvar</Button>
        </div>
      ) : null
    )
  }

}

export default Register;