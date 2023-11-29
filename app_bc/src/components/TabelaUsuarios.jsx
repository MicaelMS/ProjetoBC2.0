import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Table, Tooltip, message } from "antd";
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import Detalhes from "@/pages/admin/users/Detalhes";
import { format } from "date-fns";
import axios from 'axios';

function TabelaUsuarios({ usuarios, onFilterChange, onUsuariosChange }) {
  const [filtro, setFiltro] = useState();
  const [mensagem, contextHolder] = message.useMessage();
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'author_name',
      key: 'author_name',
    },
    {
      title: 'Email',
      dataIndex: 'author_email',
      key: 'author_name',
    },
    {
      title: 'Level',
      dataIndex: 'author_level',
      key: 'author_name',
      width: 150,
    },
    {
      title: 'Data Cadastro',
      dataIndex: 'author_create_date',
      key: 'author_create_date',
      width: 150,
      render: (value) => (
        format(new Date(value), 'dd/MM/yyyy')
      )
    },
    {
      title: '',
      align: 'center',
      dataIndex: 'author_name',
      key: 'author_name',
      width: 120,
      render: (_, row) => (
        <Row>
          <Col span={8}>
            <Detalhes usuario={row}
              onUsuariosChange={onUsuariosChange}>
              <Tooltip title='Editar'>
                <Button icon={<EditOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
          <Col span={8}>
            <Detalhes usuario={row}
              consulta={true}>
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

  const inativar = async (usuario) => {
    try {
      await axios.delete(`http://localhost:4000/user/deletar/${usuario._id}`, { ...usuario });
      mensagem.open({
        type: 'success',
        content: "Usuário inativado com sucesso!",
      });
      onUsuariosChange?.();
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
      <Card title={'Tabela Usuários'}>
        <Row gutter={[10, 10]}
          justify={'end'}>
          <Col span={20}>
            <Input value={filtro}
              onChange={({ target: { value } }) => setFiltro(value)}
              placeholder="Pesquisar por nome..."
              suffix={<SearchOutlined />} />
          </Col>
          <Col span={4}>
            <Detalhes onUsuariosChange={onUsuariosChange}>
              <Button type="primary"
                block>
                Cadastrar
              </Button>
            </Detalhes>
          </Col>
          <Col span={24}>
            <Table size="small"
              columns={columns}
              dataSource={usuarios}
              bordered
              onChange={onUsuariosChange}
              pagination={false} />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default TabelaUsuarios;