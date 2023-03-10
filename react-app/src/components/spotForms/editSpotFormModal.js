import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './editSpotForm.js';


function EditSpotFormModal({filteredSpot}){
  const [showModal, setShowModal] = useState(false)
  // console.log(filteredSpot)



  return (
    <>
      <button className="edit-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm setShowModal={setShowModal} filteredSpot={filteredSpot}/>
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal
