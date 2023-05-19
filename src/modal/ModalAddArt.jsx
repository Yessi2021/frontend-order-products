import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dataCrud from '../components/api/crud';


function ModalAddArt({getOne,getData}) {

  const [show, setShow] = useState(false);


    const [formData, setFormData] = useState({
      name: '',
      descripcion: '',
      price: 0,
      tax: 0,
      NotTax: 0
    });

  
  
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${dataCrud}/api/`, formData)
      .then(response => console.log(response))
      .catch(error => console.log(error));

      setShow(false)
      setFormData("")
    
      setTimeout( async () => {
        await getData()
      }, 200);
     
  };

  return (
    <>

      <div className="m-auto">
      <Button variant="success"  onClick={handleOpen}>
        Add new article
      </Button>
      </div>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar informacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
      <div style={{width:"600px"}} >
     
<form onSubmit={ handleSubmit } style={{width:"400px",margin:"auto"}} >  
  <div className="form-group">
  <label> 
         Name:
      <input 
         type="text" 
        name="name" 
        className='form-control'
        value={formData.name || '' } 
        onChange={(event) =>setFormData({ ...formData, name: event.target.value })} 
      />
    </label>
  </div>
  <div className="form-group">
      <label>
          Descripcion:
      <input 
         type="text" 
        name="descripcion" 
        className='form-control'
        value={formData.descripcion || '' } 
        onChange={(event) =>setFormData({ ...formData, descripcion: event.target.value })} 
      />
    </label>
  </div>

   <div className="form-group">
   <label>
          Price:
      <input 
        required
        className='form-control'
         name="price" 
         type="number" 
         step="0.01"
        value={ formData.price  } 
        onChange={(event) =>setFormData(
           { ...formData, price: event.target.value }
       
          )} 
      />
    </label>
   </div>
    

 <div className="form-group">
      <label>
          Tax:
      <input 
      className='form-control'
        type="number" 
        step="0.01"
        name="tax" 
        value={  formData.tax } 
        onChange={(event) =>setFormData({ ...formData, tax: event.target.value })} 
      />
    </label>
 </div>

  {
    formData.tax > 0 ? ( <span>No taxt</span> ) : (  
   <div className="form-group">
         <label>
         Not Tax:
   <input 
      type="number" 
     name="NotTax" 
     className='form-control'
     value={ formData.NotTax  } 
     onChange={(event) =>setFormData({ ...formData, NotTax: event.target.value })} 
   />
 </label>
   </div>

 )}

   <div className="form-group m-2">
    <button className='btn btn-success w-70' type="submit" > Add article </button>
   </div>

</form>
      </div>

     </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddArt;