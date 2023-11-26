import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Table, Tooltip } from "antd";
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import Detalhes from "@/pages/admin/users/Detalhes";
import { format } from "date-fns";

function TabelaUsuarios({ usuarios, onFilterChange, onUsuariosChange }) {
  const [filtro, setFiltro] = useState();
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
        <Row>
          <Col span={12}>
            <Detalhes usuario={row}
              onUsuariosChange={onUsuariosChange}>
              <Tooltip title='Editar'>
                <Button icon={<EditOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
          <Col span={12}>
            <Detalhes usuario={row}
              consulta={true}>
              <Tooltip title='Consultar'>
                <Button icon={<SearchOutlined />} />
              </Tooltip>
            </Detalhes>
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

  return (
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
  )
}

export default TabelaUsuarios;