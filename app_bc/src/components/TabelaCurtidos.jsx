import React, { useState, useEffect } from "react";
import { Button, Card, Table, Form, Input, Col, Row, Tooltip } from "antd"; // Certifique-se de incluir o 'Form' aqui
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { format } from "date-fns";
import axios from "axios";
import Link from "next/link";

function TabelaCurtidos(props) {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState();
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'titulo',
      key: "titulo",
      width: 300,
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 90,
    },
    {
      title: 'Publicação',
      dataIndex: 'publicacao',
      key: 'publicacao',
      width: 90,
      render: (publicacao) => (
        format(new Date(publicacao), 'dd/MM/yyyy')
      )
    },
    {
      title: '',
      align: 'center',
      dataIndex: '',
      key: '',
      width: 90,
      render: (_, row) => (
        <Row>
          <Col span={24}>
            <Link href={`../Artigo?${new URLSearchParams(enviaArtigo(row)).toString()}`}
              passHref>
              <Tooltip title='Visualizar'>
                <Button icon={<EyeOutlined />} />
              </Tooltip>
            </Link>
          </Col>
        </Row>
      )
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const enviaArtigo = (artigo) => {
    const queryParams = Object.entries(artigo)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return queryParams;
  }

  const fetchData = async (filtro) => {
    try {
      const response = await axios.get("http://localhost:4000/article/consultar?tipo=curtida", { params: { filtro } });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao obter dados:", error.message);
    }
  };

  return (
    <Card title='Lista de Artigos Mais Curtidos'>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Input placeholder="Pesquisar por chave..."
            suffix={<SearchOutlined />}
            onChange={(value) => fetchData(value)} />
        </Col>
        <Col span={24}>
          <Table size="small"
            dataSource={data}
            columns={columns}
            bordered
            pagination={false} />
        </Col>
      </Row>
    </Card>
  );
}

export default TabelaCurtidos;