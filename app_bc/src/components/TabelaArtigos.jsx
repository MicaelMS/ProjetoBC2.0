import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Table, Tooltip, message } from "antd";
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import Detalhes from "@/pages/admin/artigos/Detalhes";
import { format } from "date-fns";
import axios from 'axios';

function TabelaArtigos({ artigos, onFilterChange, onArtigosChange }) {
  const [filtro, setFiltro] = useState();
  const [mensagem, contextHolder] = message.useMessage();
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
      width: 120,
      render: (_, row) => (
        <Row>
          <Col span={8}>
            <Detalhes artigo={row}
              onArtigosChange={onArtigosChange}>
              <Tooltip title='Editar'>
                <Button icon={<EditOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
          <Col span={8}>
            <Detalhes artigo={row} consulta={true}>
              <Tooltip title='Consultar'>
                <Button icon={<SearchOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
          <Col span={8}>
            <Tooltip title='Inativar'>
              <Button icon={<DeleteOutlined />}
                onClick={() => { inativar(row) }}
                danger />
            </Tooltip>
          </Col>
        </Row>
      )
    }
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filtro);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [filtro]);

  const inativar = async (artigo) => {
    try {
      await axios.delete(`http://localhost:4000/article/deletar/${artigo._id}`, { ...artigo });
      mensagem.open({
        type: 'success',
        content: "Artigo inativado com sucesso!",
      });
      onArtigosChange?.();
    } catch (error) {
      mensagem.open({
        type: 'error',
        content: error.message,
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Card title={'Tabela Artigos'}>
        <Row gutter={[10, 10]}
          justify={'end'}>
          <Col span={20}>
            <Input value={filtro}
              placeholder="Pesquisar por chave..."
              onChange={({ target: { value } }) => setFiltro(value)}
              suffix={<SearchOutlined />} />
          </Col>
          <Col span={4}>
            <Detalhes onArtigosChange={onArtigosChange}>
              <Button type="primary"
                block>
                Cadastrar
              </Button>
            </Detalhes>
          </Col>
          <Col span={24}>
            <Table size="small"
              columns={columns}
              dataSource={artigos}
              bordered
              onChange={onArtigosChange}
              pagination={false} />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default TabelaArtigos;