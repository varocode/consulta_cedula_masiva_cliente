import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

interface Usuario {
  id: number;
  tabla: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  address3: string;
  alt_phone: string;
}

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Usuario[]>([]); // Usando la interfaz aquí

  const handleSearch = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/consultar', { emails: input });
        setResults(response.data);
    } catch (error) {
        console.error('Error al consultar los emails:', error);
    }
};

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");
    XLSX.writeFile(workbook, 'Resultados_Consulta.xlsx');
  };

  return (
    <div className="container mt-5">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ingrese cédulas separadas por comas"
        className="form-control"
      />
      <button onClick={handleSearch} className="btn btn-primary mt-3">Consultar</button>
      {results.length > 0 && (
        <>
          <table className="table mt-3">
            <thead>
              <tr>
              <th>ID</th>
              <th>Proyecto</th>
              <th>Cedula</th>
              <th>Teléfono1</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono3</th>
              <th>Teléfono2</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user, index) => (
                <tr key={index}>
                <td>{user.id}</td>
                <td>{user.tabla}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.address3}</td>
                <td>{user.alt_phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={exportToExcel} className="btn btn-success mt-3">Descargar Excel</button>
        </>
      )}
    </div>
  );
}

export default App;
