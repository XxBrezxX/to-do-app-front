import { Button, Container, Form, Table } from "react-bootstrap";
import './toDoTable.css'
import { useContext, useState } from "react";
import ReactPaginate from 'react-paginate';
import { FormDataContext } from "../../utils/FormDataContext";

const ToDoTable = ({ dataTabla, actualizarDataTabla }) => {
    const properties = [
        "Checkbox",
        "Name",
        "Priority",
        "Due Date",
        "Actions"
    ];

    const [formData, setFormData] = useContext(FormDataContext);
    const [sortOrderA, setSortOrderA] = useState('up');
    const [sortOrderB, setSortOrderB] = useState('up');

    const handleClickA = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            prioritySort: sortOrderA === 'up' ? false : true,
        }));
        setSortOrderA(sortOrderA === 'up' ? 'down' : 'up');
        setFormData((prevFormData) => ({
            ...prevFormData,
            prioritySort: sortOrderA === 'up' ? false : true,
        }));
        console.log(formData);
    };

    const handleClickB = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            dueDateSort: sortOrderB === 'up' ? false : true,
        }));
        setSortOrderB(sortOrderB === 'up' ? 'down' : 'up');
        setFormData((prevFormData) => ({
            ...prevFormData,
            dueDateSort: sortOrderB === 'up' ? false : true,
        }));

        console.log(formData);
    };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const pageCount = Math.ceil(dataTabla.length / itemsPerPage);
    const handlePageChange = (selectedPage) => {
        console.log(selectedPage.selected)
        setCurrentPage(selectedPage.selected);
    }
    const offset = currentPage * itemsPerPage;
    const currentPageData = dataTabla.slice(offset, offset + itemsPerPage);

    return (
        <Container className="py-4">
            <div className="tableSize">
                <Table striped bordered hover >
                    <thead className="bg-secondary text-white">
                        <tr className="text-center justify-content-center align-items-center">
                            {properties.map((item, index) => (
                                <th key={index}>
                                    {
                                        item === "Checkbox" ?
                                            <Form.Check
                                                type="checkbox"
                                                className="custom-disabled-checkbox"
                                            /> :
                                            item === "Priority" ?
                                                <Button variant='secondary' className="button-no-padding button-no-margin" onClick={handleClickA}>
                                                    Priority {sortOrderA === 'up' ? 'Up' : 'Down'}
                                                </Button > :
                                                item === "Due Date" ?
                                                    <Button variant='secondary' className="button-no-padding button-no-margin" onClick={handleClickB}>
                                                        Due Date {sortOrderB === 'up' ? 'Up' : 'Down'}
                                                    </Button > :
                                                    item
                                    }
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="tableBg">
                        {currentPageData.map((toDoClass, index) => (
                            <tr className="justify-content-center text-center align-items-center">
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                    />
                                </td>
                                <td className="custom-td">
                                    <p className="custom-td-p">{toDoClass._text}</p>
                                </td>
                                <td>
                                    {(() => {
                                        switch (toDoClass._priority) {
                                            case "High":
                                                return "High";
                                            case "Medium":
                                                return "Medium";
                                            default:
                                                return "Low";
                                        }
                                    })()}
                                </td>
                                <td>
                                    {toDoClass.dueDate.toString()}
                                </td>
                                <td>
                                    Edit / Delete
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                pageCount={pageCount} // Número total de páginas
                onPageChange={handlePageChange} // Función para manejar el cambio de página
                containerClassName="pagination-container" // Clase CSS para el contenedor del paginador
                pageClassName="pagination-item"
                previousLabel={''}
                nextLabel={''}
                breakLabel={"..."}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
            />
        </Container >
    );
}

export default ToDoTable;