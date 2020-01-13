import React from "react";
import { Button, Form, Alert } from "react-bootstrap";

class AddCar extends React.Component {
  state = {
    plateNumber: "",
    model: "",
    issueDate: "",
    isAdding: false,
    isNotValidDetails: false
  };
  changeHandle = e => {
    const carDetail = {};
    carDetail[e.target.name] = e.target.value;
    this.setState(() => carDetail);
  };
  submitHandle = e => {
    e.preventDefault();
    if (!this.isCarDetailsValid()) {
      this.setState(() => ({ isNotValidDetails: true }));
      return;
    }

    const car = { ...this.state };
    delete car.isAdding;
    delete car.isNotValidDetails;
    this.props.addCar(car);
    this.setState(() => ({ isAdding: false }));
  };
  onClickAddCar = () => {
    this.setState(() => ({ isAdding: true }));
    this.setState(() => ({ isNotValidDetails: false }));
  };
  isCarDetailsValid = () => {
    const isdateValid =
      new Date(this.state.issueDate).getTime() < new Date().getTime();
    const ismodelValid = this.state.model < 2021;
    const isExistingPlate = !this.props.carsPlates.some(
      plate => plate === this.state.plateNumber
    );
    return isdateValid && ismodelValid && isExistingPlate;
  };

  render() {
    return (
      <div>
        {!this.state.isAdding ? (
          <Button variant="info" onClick={this.onClickAddCar}>
            Add a new car
          </Button>
        ) : (
          <div style={{ width: "50%" }}>
            <Form onSubmit={this.submitHandle}>
              <Form.Group>
                <Form.Label forhtml="plateNumber">Plate Number</Form.Label>
                <Form.Control
                  name="plateNumber"
                  id="plateNumber"
                  type="text"
                  onChange={this.changeHandle}
                  required
                />
              </Form.Group>

              <div>
                <Form.Group>
                  <Form.Label forhtml="model">Model</Form.Label> <br></br>
                  <Form.Control
                    placeholder={2000}
                    name="model"
                    id="model"
                    type="number"
                    onChange={this.changeHandle}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <Form.Label forhtml="issueDate">Issue Date</Form.Label>{" "}
                  <br></br>
                  <Form.Control
                    name="issueDate"
                    id="issueDate"
                    type="date"
                    pattern={this.emailPattern}
                    required
                    onChange={this.changeHandle}
                  />
                </Form.Group>
              </div>
              <div>
                <Button variant="success" type="submit">
                  Add
                </Button>
              </div>
            </Form>
            <div>
              {this.state.isNotValidDetails && (
                <Alert variant={"warning"}>Car detials Not Valid</Alert>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default AddCar;
