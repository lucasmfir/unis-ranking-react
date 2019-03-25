import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import './App.css';
import Register from './components/Register';
import RegisterGrade from './components/RegisterGrade';
import Header from './components/Header';

class App extends Component {

  state = {
    unis: [],
    courses: [],
    addType: null,
    grades: []
  }

  componentDidMount() {
    this.getUnis()
    this.getCourses()
    this.getGrades()
  }

  getUnis = _ => {
    fetch("https://still-sands-23370.herokuapp.com/unis/")
      .then(response => response.json())
      .then(response => this.setState({ unis: response.data }))
      .catch(err => console.error(err))
  }

  getCourses = _ => {
    fetch("https://still-sands-23370.herokuapp.com/courses/")
      .then(response => response.json())
      .then(response => this.setState({ courses: response.data }))
      .catch(err => console.error(err))
  }

  getGrades = _ => {
    fetch("https://still-sands-23370.herokuapp.com/grades/")
      .then(response => response.json())
      .then(response => this.setState({ grades: response.data }))
      .catch(err => console.error(err))
  }

  addUni = (name) => {
    fetch(`https://still-sands-23370.herokuapp.com/unis/add?name=${name}`)
      .then(response => response.json())
      .then(this.getUnis())
      .catch(err => console.error(err))
  }

  addCourse = (name) => {
    fetch(`https://still-sands-23370.herokuapp.com/courses/add?name=${name}`)
      .then(response => response.json())
      .then(this.getCourses())
      .catch(err => console.error(err)) 
  }

  addGrade = (uni_id, course_id, grade) => {
    fetch(`https://still-sands-23370.herokuapp.com/grade/add?uni_id=${uni_id}&course_id=${course_id}&grade=${grade}`)
      .then(response => response.json())
      .then(this.getGrades())
      .catch(err => console.error(err)) 
  }

  add = (type) => {
    this.setState({addType: type})
  }

  save = (type, value) => {
    if(type === "uni"){
      this.addUni(value)
    } else if (type === "course"){
      this.addCourse(value)
    }
  }

  saveGrade = (uni, course, grade) => {
    this.addGrade(uni.value, course.value, grade)
  }

  render() {
    const { unis, courses, addType, grades } = this.state

    return (
      <div className="main-container">
        <Header
          handleAdd={this.add}
        />
        <Row>
          <Col xs="8">
            <Table dark>
              <thead>
                <tr>
                  <th>Universidade</th>
                  <th>Curso</th>
                  <th>Nota</th>
                  <th>Média Geral</th>
                </tr>
              </thead>

              <tbody>
                {grades.map(grade => 
                  <tr>
                    <td>{grade.uni_name}</td>
                    <td>{grade.course_name}</td>
                    <td>{grade.grade}</td>
                    <td>{grade.average}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs="4">
            {addType !== "grade" ? (
              <Register
                type={addType}
                handleSave={this.save}
              />
            ): <RegisterGrade
              unis={unis}
              courses={courses}
              handleSave={this.saveGrade}
            />}
          </Col>
        </Row>

      </div>
    );
  }
}

export default App;
