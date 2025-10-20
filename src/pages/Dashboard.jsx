import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import Table from "react-bootstrap/Table";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteData, getData, patchData, postData } from "../services/Config";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";


const Dashboard = () => {

  const [append, setappend] = useState(0)
  const [stockVal, setstockVal] = useState(0)
  const [stock1, setstock1] = useState(0)
  const [Data1, setData] = useState([]);
  const [addData, setaddData] = useState({
    p_name : '',
    price : '',
    stock : ''
  })



const [Updated, setUpdated] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const getAllData = async () => {
    let allData = await getData();
    setData(allData.data);
  };

  const inputData = async ()=>{
    let newdata = await postData(addData)
    if(addData.stock==0){
      setstock1(stock1+1)
    }else{
      setstock1(stock1)
    }
    if(stockVal==0){
      setstockVal(addData.price*addData.stock)
    }else{
     setstockVal(stockVal + addData.price*addData.stock)
    }
    setappend(append+1)
    console.log(newdata.data)
    getAllData()
  }

  const deleteAllData = async (id)=>{
    let deleteDat =  await deleteData(id)
    setappend(append-1)
    getAllData()
  }

  const editData = async (value)=>{
    setUpdated(value)
  }

  const patchVal = async ()=>{
    let reqBody = {
      p_name : Updated.p_name,
      price : Updated.price,
      stock : Updated.stock
    }

    let passVal = await patchData(Updated.id,reqBody)
    console.log(passVal)
    getAllData()
  }

 



  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      {/* 1st box */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Product Dashboard
            </Typography>
            <Button color="inherit">About Us</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* 2nd box */}

      <div>
        <h3 className="text-center mt-4 fw-bold">Product Inventory</h3>
        <p className="text-center">
          Manage your products with ease and efficiency.
        </p>
      </div>
      <div>
        <Container className="mt-5">
          <Row className="text-center g-4">
            <Col>
              <Card
                style={{
                  width: "18rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card.Body>
                  <Card.Title className="fs-1">
                    <MdOutlineProductionQuantityLimits />
                  </Card.Title>
                  <Card.Text>Total Products</Card.Text>
                  <Card.Text className="text-primary fs-5">{append}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card.Body>
                  <Card.Title className="fs-1">
                    <RiMoneyDollarCircleFill />
                  </Card.Title>
                  <Card.Text>Total Stock Value</Card.Text>
                  <Card.Text className="text-success fs-5">{stockVal}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card.Body>
                  <Card.Title className="fs-1">
                    <IoIosWarning />
                  </Card.Title>
                  <Card.Text>Out of Stock</Card.Text>
                  <Card.Text className="text-danger fs-5">{stock1}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="text-center mt-5">
        <button onClick={handleShow} className="btn btn-success">
          Add Product <FaPlus className="ms-1" style={{ fontSize: 13 }} />{" "}
        </button>

                {/* add box */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="bg-dark text-light" closeButton>
            <Modal.Title>Add Products</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <input
             onChange={(e)=>setaddData({...addData,p_name:e.target.value})}
              placeholder="Enter Product Name"
              className="form-control"
              type="text"
            />
            <br />
            <input
            onChange={(e)=>setaddData({...addData,price:e.target.value})}
              placeholder="Enter Product Price"
              className="form-control"
              type="text"
            />
            <br />
            <input
             onChange={(e)=>setaddData({...addData,stock:e.target.value})}
              placeholder="Enter Stock Left"
              className="form-control"
              type="text"
            />
          </Modal.Body>
          <Modal.Footer className="bg-dark text-light">
            <button onClick={handleClose} className="btn btn-sm btn-danger">
              Close
            </button>
            <button onClick={()=>{
              inputData()
              handleClose()
            }} className="btn btn-sm btn-success">
              Add
            </button>
          </Modal.Footer>
        </Modal>

            {/* edit box */}

          <Modal show={show1} onHide={handleClose1}>
          <Modal.Header className="bg-dark text-light" closeButton>
            <Modal.Title>Edit Products</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <input
            value={Updated.p_name}
             onChange={(e)=>setUpdated({...Updated,p_name:e.target.value})}
              placeholder="Enter Product Name"
              className="form-control"
              type="text"
            />
            <br />
            <input
            value={Updated.price}
            onChange={(e)=>setUpdated({...Updated,price:e.target.value})}
              placeholder="Enter Product Price"
              className="form-control"
              type="text"
            />
            <br />
            <input
            value={Updated.stock}
             onChange={(e)=>setUpdated({...Updated,stock:e.target.value})}
              placeholder="Enter Stock Left"
              className="form-control"
              type="text"
            />
          </Modal.Body>
          <Modal.Footer className="bg-dark text-light">
            <button onClick={handleClose1} className="btn btn-sm btn-danger">
              Close
            </button>
            <button onClick={()=>{
              patchVal()
              handleClose1()
            }} className="btn btn-sm btn-success">
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="bg-black text-light text-center">Id</th>
              <th className="bg-black text-light text-center">Product Name</th>
              <th className="bg-black text-light text-center">Price</th>
              <th className="bg-black text-light text-center">Stock</th>
              <th className="bg-black text-light text-center">Operations</th>
            </tr>
          </thead>
          {Data1.map((value) => (
            <tbody key={value.id} className="fw-bold text-center">
              <tr>
                <td>{value.id}</td>
                <td>{value.p_name}</td>
                <td>{value.price}</td>
                <td>{value.stock}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button onClick={()=>{
                      editData(value)
                      handleShow1()
                    }} className="btn p-0 fs-5 text-primary">
                      <FaRegEdit />
                    </button>
                    <button onClick={()=>{deleteAllData(value.id)}} className="btn p-0  fs-5 text-danger">
                      <IoTrashBinSharp />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
