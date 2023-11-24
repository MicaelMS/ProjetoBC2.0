import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { EditOutlined } from '@ant-design/icons';
import Detalhes from "@/pages/admin/users/Detalhes";
import { format } from "date-fns";

function TabelaUsuarios({ usuarios, onUsuariosChange }) {
  console.log('usuarios', usuarios);
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
      width: 90,
      render: (_, row) => (
        <Detalhes usuario={row}>
          <Button icon={<EditOutlined />} />
        </Detalhes>
      )
    }
  ];

  return (
    <Card title={'Tabela Usuários'}>
      <Row gutter={[10, 10]}
        justify={'end'}>
        <Col>
          <Detalhes>
            <Button type="primary">
              Cadastrar
            </Button>
          </Detalhes>
        </Col>
        <Col span={24}>
          <Table size="small"
            columns={columns}
            dataSource={usuarios}
            bordered
            onChange={onUsuariosChange} />
        </Col>
      </Row>
    </Card>
  )
}

export default TabelaUsuarios;