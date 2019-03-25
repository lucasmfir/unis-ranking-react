import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import './App.css';
import Register from './components/Register';
import RegisterGrade from './components/RegisterGrade';
import Header from './components/Header';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    unis: [],
    courses: [],
    addType: null,
    grades: [],
    filter: ''
  }

  componentDidMount() {
    this.getUnis()
    this.getCourses()
    this.getGrades()
  }

  getUnis = _ => {
    fetch("http://localhost:4000/unis/")
      .then(response => response.json())
      .then(response => this.setState({ unis: response.data }))
      .catch(err => console.error(err))
  }

  getCourses = _ => {
    fetch("http://localhost:4000/courses/")
      .then(response => response.json())
      .then(response => this.setState({ courses: response.data }))
      .catch(err => console.error(err))
  }

  getGrades = _ => {
    fetch("http://localhost:4000/grades/")
      .then(response => response.json())
      .then(response => this.setGradesState(response.data))
      .catch(err => console.error(err))
  }

  addUni = (name) => {
    fetch(`http://localhost:4000/unis/add?name=${name}`)
      .then(response => response.json())
      .then(this.getUnis())
      .catch(err => console.error(err))
  }

  addCourse = (name) => {
    fetch(`http://localhost:4000/courses/add?name=${name}`)
      .then(response => response.json())
      .then(this.getCourses())
      .catch(err => console.error(err))
  }

  addGrade = (uni_id, course_id, grade) => {
    fetch(`http://localhost:4000/grade/add?uni_id=${uni_id}&course_id=${course_id}&grade=${grade}`)
      .then(response => response.json())
      .then(this.getGrades())
      .catch(err => console.error(err))
  }

  deleteGrade = (grade_id) => {
    fetch(`http://localhost:4000/grade/delete?grade_id=${grade_id}`)
      .then(response => response.json())
      .then(this.getGrades())
      .catch(err => console.error(err))
  }

  add = (type) => {
    this.setState({ addType: type })
  }

  save = (type, value) => {
    if (type === "uni") {
      this.addUni(value)
    } else if (type === "course") {
      this.addCourse(value)
    }
  }

  saveGrade = (uni, course, grade) => {
    this.addGrade(uni.value, course.value, grade)
  }

  setGradesState = (grades = this.state.grades) => {
    const filter = this.state.filter.toLowerCase()

    if (filter && filter.length) {
      grades = grades.map(grade => {
        if (grade.uni_name.toLowerCase().includes(filter)) {
          return { ...grade, show: true }
        }
        return { ...grade, show: false }
      })
    } else {
      grades = grades.map(grade => {
        return { ...grade, show: true }
      })
    }

    this.setState({ grades })
  }

  changeFilter = (e) => {
    const filter = e.target.value
    this.setState({ filter }, () => this.setGradesState())

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
            <Input className="mt-2 mb-2" placeholder="Filtro de Universidade" type="text" onChange={this.changeFilter} />
            <Table dark>
              <thead>
                <tr>
                  <th>Universidade</th>
                  <th>Curso</th>
                  <th>Nota</th>
                  <th>Média Geral</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {grades.filter(grade => grade.show).map(grade =>
                  <tr key={grade.grade_id}>
                    <td>{grade.uni_name}</td>
                    <td>{grade.course_name}</td>
                    <td>{grade.grade}</td>
                    <td>{grade.average}</td>
                    <td><Button color="danger" onClick={() => this.deleteGrade(grade.grade_id)}><FontAwesomeIcon icon={faTrash} /></Button></td>
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
            ) : <RegisterGrade
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
