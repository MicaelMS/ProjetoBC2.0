import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Divider, Button, Input } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

const Artigo = () => {
  const [artigo, setArtigo] = useState();
  const router = useRouter();

  useEffect(() => {
    const { autor, conteudo, status, titulo, chave, curtidas, publicacao } = router.query;
    setArtigo({ autor, conteudo, status, titulo, chave, curtidas, publicacao });
  }, [router.query]);

  const handleCurtir = () => {

  }

  return (
    <Card title="Artigo"
      style={{
        width: 1250,
        margin: 'auto',
        marginTop: 10,
      }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>{artigo?.titulo}</Title>
        </Col>
        <Col span={24}>
          <Text strong>Data de Publicação:</Text> {artigo?.publicacao}
        </Col>
        <Col span={24}>
          <Text strong>Autor:</Text> {artigo?.autor}
        </Col>
        <Col span={24}>
          <Text strong>Conteúdo:</Text>
          <Divider />
          <Text>{artigo?.conteudo}</Text>
        </Col>
        <Col span={20}>
          <Text strong>Key(s):</Text> {artigo?.chave}
        </Col>
        <Col span={4}>
          <Row gutter={[10, 10]}>
            <Col span={10}>
              <Input value={artigo?.curtidas}
                disabled={true} />
            </Col>
            <Col span={14}>
              <Button type={'dashed'}
                onClick={handleCurtir}
                icon={<HeartOutlined style={{ color: 'red' }} />} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Artigo;
