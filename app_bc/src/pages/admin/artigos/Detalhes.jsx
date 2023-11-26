import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Axios from 'axios';
import TypeaheadUsuario from '@/components/TypeaheadUsuario';

export default function Detalhes({ artigo, onArtigosChange, children, consulta = false }) {
  const [visible, setVisible] = useState(false);
  const [mensagem, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [user, setUser] = useState({
    // author_id: "",
    author_name: "",
    author_email: "",
    author_user: "",
    author_pwd: "",
    author_level: "",
    author_status: "",
    // author_create_date: ""
  });

  const optionsStatus = [
    { value: 'publicado', text: 'Publicado' },
    { value: 'rascunho', text: 'Rascunho' },
  ];

  useEffect(() => {
    form.setFieldsValue({ ...artigo });
  }, [visible, artigo]);

  const onCancel = () => {
    console.log('teste');
    form.resetFields();
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
  };

  const handleCreate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      console.log(artigo._id);
      if (artigo._id) {
        await Axios.put(`http://localhost:4000/article/editar/${artigo._id}`, { ...formData });
        mensagem.open({
          type: 'success',
          content: "Artigo editado com sucesso!",
        });
        onCancel();
      } else {
        await Axios.post('http://localhost:4000/article/salvar', { ...formData });
        mensagem.open({
          type: 'success',
          content: "Artigo salvo com sucesso!",
        });
      }
      onArtigosChange?.();
      onCancel();
    } catch (error) {
      mensagem.open({
        type: 'error',
        content: `Erro ao ${artigo._id ? 'editar' : 'criar'} o Artigo!`,
      });
    }
  };

  return (
    <>
      {contextHolder}
      {React.cloneElement(children, { onClick: handleClick })}
      <Modal open={visible}
        title={`${consulta ? 'Consultar' : artigo ? 'Editar' : 'Cadastrar'} Artigo`}
        okText="Salvar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={handleCreate}>
        <Form form={form} layout="vertical" disabled={consulta}>
          <Row gutter={[5, 0]}>
            <Col span={24}>
              <Form.Item name="titulo"
                label="Título"
                rules={[{ required: true, message: 'Por favor, insira o título do artigo' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="autor"
                label="Autor"
                rules={[{ required: true, message: 'Por favor, insira o autor do artigo' }]}>
                <TypeaheadUsuario nome={form.getFieldValue('autor')}
                  onChange={(value) => form.setFieldsValue({ autor: value })} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="conteudo"
                label="Conteúdo"
                rules={[{ required: true, message: 'Por favor, insira o conteúdo do artigo' }]}>
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="status"
                label="Status"
                rules={[{ required: true, message: 'Por favor, selecione o status do artigo' }]}>
                <Select placeholder="Selecione o status do artigo">
                  {optionsStatus.map((option) => (
                    <Select.Option key={option.value}
                      value={option.value}>
                      {option.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="chave"
                label="Chaves"
                rules={[{ required: true, message: 'Por favor, insira as chaves do artigo' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="curtidas"
                label="Curitdas">
                <Input disabled
                  suffix={<HeartOutlined style={{ color: 'red' }} />} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
