import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dataCrud from '../components/api/crud';



function ModalEditArt({ setShow, show, getOne, getData }) {

  const { _id, name, descripcion, price , tax, NotTax} = getOne

  console.log(getOne);

  const [formData, setFormData] = useState({
    name: name,
    descripcion: descripcion,
    price: price,
    tax: tax,
    NotTax: NotTax
  });



  const handleClose = () => setShow(false);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${dataCrud}/api/${_id}`, formData)
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getData()

    setTimeout(() => {
      handleClose()
    }, 100);

  }

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar informacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="content m-4">
              <form onSubmit={handleSubmit} >
               <div className="form-group">
               <label>
                  Name:
                  <input
                    type="text"
                    placeholder={name}
                    name="name"
                    className='form-control'
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  />
                </label>
               </div>



             <div className="form-group">
             <label>
                  Description:
                  <input
                    type="text"
                    name="descripcion"
                    placeholder={ descripcion }
                    className='form-control'
                    onChange={(event) => setFormData({ ...formData, descripcion: event.target.value })}
                  />
                </label>
             </div>

                <div className="form-group">
                <label>
                  Tax:
                  <input
                    type="number"
                    name="price"
                    placeholder={price}
                    className='form-control'
                    onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                  />
                </label>
                </div>

                <label>
                  Price:
                  <input
                    type="number"
                    name="tax"
                    placeholder={tax}
                    className='form-control'
                    onChange={(event) => setFormData({ ...formData, tax: event.target.value })}
                  />
                </label>

                <label>
                  Not Tax:
                  <input
                    type="number"
                    name="NotTax"
                    placeholder={ NotTax }
                    className='form-control'
                    onChange={(event) => setFormData({ ...formData, NotTax: event.target.value })}
                  />
                </label>

               <div className="form-group m-4">
               <button className='btn btn-warning' type="submit">Edit Article</button>
               </div>
              </form>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditArt;