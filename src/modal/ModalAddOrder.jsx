import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dataCrud from '../components/api/crud';

function ModalAddOrder({ getOne, getData, setShow, show, orderNotRepeat, setdata, data }) {

  const [arrayRemoved, setArrayRemoved] = useState(orderNotRepeat);
  //  console.log( arrayRemoved );

  const dateCreate = moment();
  const dateFormat = dateCreate.format('dddd, D MMMM YYYY');


  const navigate = useNavigate();

  // console.log( arrayRemoved);

  const [formData, setFormData] = useState({
    description: ''
  });


  let price = 0
  let tax = 0


  for (let i = 0; i < orderNotRepeat.length; i++) {
    price += orderNotRepeat[i].price;
    tax += orderNotRepeat[i].price + orderNotRepeat[i].tax;
  }


  let totalArray = []
  orderNotRepeat.forEach(pro => {
    pro.total = pro.tax !== 0 ? pro.tax + pro.price : pro.price
    pro.about = [formData]
    pro.date = dateFormat
    totalArray.push(pro)

  })

  // eliminar artuclos seleccionados en el backend

  const handleRemove = (id) => {
    setArrayRemoved((idOrder) => {
      return idOrder.filter((i) => i._id !== id)
    })

  }

  setTimeout(() => {

    if (arrayRemoved.length === 0) {
      navigate('/')
    }

  }, 1000);

  const handleClose = () => {
    setShow(false)
    getData()

    setArrayRemoved([])


  };

  console.log(arrayRemoved);
  // const handleOpen = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      if (formData.description === '') {
        Swal.fire({
          title: 'The field',
          text: 'Text about your order is required',
          icon: 'error',
          confirmButtonText: 'Acept'
        });

        navigate('/')
      } else {
        
        const response = await axios.post(`${dataCrud}/api-order`, {
          order: [arrayRemoved]
        })
        // setData("")
       

        // console.log(response);

        setTimeout(() => {
          arrayRemoved.forEach( id => {    
              axios.delete(`${dataCrud}/api/${id._id}`)

         })

        }, 200);

     }



    } catch (error) {
      console.log(error);
    }


    setShow(false)
    setFormData("")

    setTimeout(async () => {
      await getData()
    }, 200);

  };


  const [valArr, setValArr] = useState(arrayRemoved)



  return (
    <>

     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Information about your order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="content m-4">


              {
                orderNotRepeat.length === 0 && (<div> <h2>There are not articles selected</h2> </div>)
              }

              <div>
                <div className="container">
                  <h4> <strong> {arrayRemoved.length === 0 ? 0 : 'Amount'}: </strong>
                    {arrayRemoved.length === 0 ? "No Articles selected" : orderNotRepeat.length}
                  </h4>
                </div>
                <div className="container">
                  <h6> <strong>Date created:</strong> {dateFormat} </h6>
                  <form >
                    <input
                      name='description'
                      required
                      type="text"
                      className='form-control'
                      placeholder='text about your order'
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                  </form>
                </div>
                {
                  arrayRemoved.map(order => (
                    <div className="card m-4" style={{ width: "25rem" }} key={order._id} >
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong> article Name: </strong>  {order.name}
                        
                        </li>
                        <li className="list-group-item">
                          <strong> Reference : </strong> {order._id}
                        </li>
                        <li className="list-group-item">
                          <strong> Price : </strong> {order.price}
                        </li>
                        <li className="list-group-item">
                          <strong> Tax : </strong> {order.tax}
                        </li>
                        <li className="list-group-item">
                          <strong>Total price without tax : </strong> {order.price}
                        </li>
                        <li className="list-group-item">
                          <strong>  Total price with tax : </strong>
                          {order.taxt !== 0 ? order.tax + order.price : order.price}
                        </li>

                        <li className="list-group-item">
                          <button className='btn btn-danger'
                            onClick={() => handleRemove(order._id)}
                          >
                            Delete your order
                          </button>
                        </li>

                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleSubmit}
          >
            Confirm your order
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddOrder;