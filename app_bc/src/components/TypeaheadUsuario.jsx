import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import axios from 'axios';

const TypeaheadUsuario = ({ nome, onChange }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(nome);
  }, [nome]);

  const fetchData = async (filtro) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/consultar`, { params: { filtro } });
      setOptions(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
    }
  };

  const handleSearch = (valor) => {
    setValue(valor);
    onChange(valor);
    fetchData(valor);
  };

  const onSelect = (valor) => {
    setValue(valor);
    onChange(valor);
  };

  return (
    <AutoComplete value={value}
      options={options.map((user) => ({ value: user.author_name }))}
      onSelect={onSelect}
      onSearch={handleSearch}
      onChange={(value) => fetchData(value)}
      placeholder="Digite o nome do usuário">
    </AutoComplete>
  );
};

export default TypeaheadUsuario;
