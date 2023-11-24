import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import Detalhes from "@/pages/admin/users/Detalhes";

function TabelaUsuarios(props) {

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
            bordered />
        </Col>
      </Row>
    </Card>
  )
}

export default TabelaUsuarios;