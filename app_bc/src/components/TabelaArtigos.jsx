import React from "react";
import { Button, Card, Col, Row, Table } from "antd";

function TabelaArtigos(props) {

  return (
    <Card title={'Tabela Artigos'}>
      <Row gutter={[10, 10]}
        justify={'end'}>
        <Col>
          <Button type="primary">
            Cadastrar
          </Button>
        </Col>
        <Col span={24}>
          <Table size="small"
            bordered />
        </Col>
      </Row>
    </Card>
  )
}

export default TabelaArtigos;