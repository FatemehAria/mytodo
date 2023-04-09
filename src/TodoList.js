import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const TodoList = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTasks = () => {
    text.trim() && setTasks((last) => [...last, { text, status: false }]);
    toast.success(`${text} Added!`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    setText("");
  };

  const removeTask = (index) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((last) => {
          const help = [...last];
          help.splice(index,1);
          return [...help];
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  };

  const changeStatus = (index) => {
    setTasks((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[index].status = !help[index].status;
      return [...help]
    })
  };
  return (
    <div className="w-50 mx-auto mt-2">
      <InputGroup className="mb-3" as={Form} onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onContextMenu={(e) => e.preventDefault()}
        />
        <Button variant="dark" onClick={() => addTasks()} type="submit">
          Add
        </Button>
      </InputGroup>

      <Container>
        <Row>
          {tasks.map((item, index) => {
            return (
              <Col key={index} xs="4">
                <Card className="mb-2">
                  <Card.Header className="bg-dark">
                    <Container>
                      <Row>
                        <Col xs={{span:"1",offset:"10"}}>
                          {item.text.length ? (
                            <CloseButton onClick={() => removeTask()} variant="white"/>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{item.text}</Card.Text>
                    <Button onClick={() => changeStatus(index)} variant={item.status ? "success" : "danger"}>
                      {item.status ? "Done" : "Undone"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
