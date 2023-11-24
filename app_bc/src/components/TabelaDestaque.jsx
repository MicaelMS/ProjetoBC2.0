import React, { useState, useEffect } from "react";
import { Button, Card, Table, Form, Input } from "antd"; // Certifique-se de incluir o 'Form' aqui
import axios from "axios";

function TabelaDestaque(props) {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Chamada à API para obter dados
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/consultar");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados:", error.message);
      }
    };

    fetchData();
  }, []); // O segundo argumento vazio faz com que useEffect seja executado apenas uma vez, semelhante a componentDidMount

  const columns = [
    {
      title: "Artigo",
      key: "artigo",
      dataIndex: "artigo",
    },
  ];

  const handleCreate = async (values) => {
    try {
      // Chamada à API para criar um novo registro
      await axios.post("http://localhost:3000/salvar", values);
      // Atualiza os dados após a criação
      fetchData();
      // Limpa o formulário após a criação
      form.resetFields();
    } catch (error) {
      console.error("Erro ao criar registro:", error.message);
    }
  };

  return (
    <Card>
      <Form form={form} onFinish={handleCreate}>
        <Form.Item label="Artigo" name="artigo">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Criar Novo Registro
        </Button>
      </Form>

      <Table size="small" dataSource={data} columns={columns} bordered />
    </Card>
  );
}

export default TabelaDestaque;
