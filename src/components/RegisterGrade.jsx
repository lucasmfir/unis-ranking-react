import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Label, Input, Button } from 'reactstrap';
import Select from 'react-select';

class RegisterGrade extends Component {

  state = {
    unis: [],
    courses: [],
    selectedUni: null,
    selectedCourse: null,
    grade: 0,
    coursesOptions: [],
    unisOptions: [],
    invalid: false
  }

  static propTypes = {
    unis: PropTypes.array,
    cousers: PropTypes.array
  }

  componentWillMount() {
    this.handleChangeGrade = this.handleChangeGrade.bind(this);
    this.handleChangeUni = this.handleChangeUni.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);

    const { unis, courses } = this.props
    this.setState({ unis, courses }, () => {
      this.setOptions()
    })
  }

  setOptions = () => {
    const { unis, courses } = this.state

    const unisOptions = unis.map(uni => ({ value: uni.uni_id, label: uni.uni_name }))
    const coursesOptions = courses.map(course => ({ value: course.course_id, label: course.course_name }))

    this.setState({ unisOptions, coursesOptions })
  }

  onSave = () => {
    const { selectedUni, selectedCourse, grade } = this.state

    if(!selectedUni || !selectedCourse || !grade.length){
      this.setState({invalid: true})
      return
    }

    this.setState({
      invalid: false,
      selectedUni: null, 
      selectedCourse: null, 
      grade: 0
    })
    this.props.handleSave(selectedUni, selectedCourse, grade)
  }

  handleChangeUni(value) {
    const selectedUni = value
    this.setState({ selectedUni })
  }

  handleChangeCourse(value) {
    const selectedCourse = value
    this.setState({ selectedCourse })
  }

  handleChangeGrade(e) {
    const grade = e.target.value
    this.setState({ grade });
  }

  render() {
    const { grade, selectedCourse, selectedUni, unisOptions, coursesOptions, invalid } = this.state
    return (
      <div>
        <Label className="mt-2" for="uni">Universidade</Label>
        <Select
          value={selectedUni}
          onChange={this.handleChangeUni}
          options={unisOptions}
        />

        <Label className="mt-2" for="course">Curso</Label>
        <Select
          value={selectedCourse}
          onChange={this.handleChangeCourse}
          options={coursesOptions}
        />

        <Label className="mt-2" for="grade">Nota</Label>
        <Input
          type="number"
          name="grade"
          id="grade"
          value={grade}
          onChange={this.handleChangeGrade}
        />
        <br />
        <Button outline color="success" onClick={this.onSave}>Salvar</Button>

        {invalid && (
          <div>
          <p>Preencha todos os campos antes de salvar.</p>
        </div>
        )}
        
      </div>
    )
  }

}

export default RegisterGrade;