import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './createSpotForm';


function CreateSpotFormModal(){
  const [showModal, setShowModal] = useState(false)


  return (
    <>
      <button className="upload-button" onClick={() => setShowModal(true)}>Become a host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal
