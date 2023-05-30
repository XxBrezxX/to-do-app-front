import './App.css';
import { Button, Container, Modal } from 'react-bootstrap';
import ToDoTable from './components/toDoTable/toDoTable';
import FilteringControls from './components/filteringControls/filtering';
import { useState } from 'react';
import ToDoModal from './components/toDoModal/toDoModal';
import { FormDataProvider } from './utils/FormDataContext';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataTabla, setDataTabla] = useState([]);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const actualizarDataTabla = (nuevaData) => { setDataTabla(nuevaData); }

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <FormDataProvider>
      <Container fluid className='centered-div transparent'>
        <Container>
          <div className="border-dark border p-2">
            <FilteringControls actualizarDataTabla={actualizarDataTabla} />
          </div>
          <Button variant='secondary' className='my-3' onClick={handleShowModal}>+New To Do</Button>
          <ToDoModal show={modalVisible} onHide={handleCloseModal}></ToDoModal>
          <ToDoTable dataTabla={dataTabla} actualizarDataTabla={actualizarDataTabla} />
        </Container>
        <p>Aqui van las metricas</p>
      </Container>
    </FormDataProvider>
  );
}

export default App;
