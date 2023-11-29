import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Row, Col } from 'antd'
import Axios from 'axios';

export default function Detalhes({ usuario, children, consulta = false, onUsuariosChange }) {
  const [visible, setVisible] = useState(false);
  const [mensagem, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...usuario })
  }, [visible]);

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


  const optionsLevel = [
    { value: 'admin', text: 'Administrador' },
    { value: 'user', text: 'Usuário' },
    { value: 'reader', text: 'Leitor' },
  ];

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  }

  const handleClick = () => {
    setVisible(true);
  }

  const handleCreate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      if (usuario) {
        await Axios.put(`http://localhost:4000/user/editar/${usuario._id}`, { ...formData });
        mensagem.open({
          type: 'success',
          content: "Usuário editado com sucesso!",
        });
        onUsuariosChange?.();
      }
      else {
        await Axios.post('http://localhost:4000/user/salvar', { ...formData });
        mensagem.open({
          type: 'success',
          content: "Usuário salvo com sucesso!",
        });
        onUsuariosChange?.();
      }
      onCancel();
    } catch (error) {
      mensagem.open({
        type: 'error',
        content: "Erro ao salvar o Usuário!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      {React.cloneElement(children, { onClick: handleClick })}
      <Modal open={visible}
        title={`${consulta ? 'Consultar' : usuario ? 'Editar' : 'Cadastrar'} Usuário`}
        okText="Salvar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={handleCreate}>
        <Form form={form}
          layout="vertical"
          disabled={consulta}>
          <Row gutter={[5, 0]}>
            <Col span={24}>
              <Form.Item name="author_name"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira o nome do usuário' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="author_email"
                label="E-mail"
                rules={[
                  { required: true, message: 'Por favor, insira o e-mail do usuário' },
                  { type: 'email', message: 'E-mail inválido' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="author_user"
                label="Usuário Login"
                rules={[{ required: true, message: 'Por favor, insira o usuário' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="author_pwd"
                label="Senha Login"
                rules={[{ required: true, message: 'Por favor, insira a senha do usuário' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="author_level"
                label="Nível Acesso"
                rules={[{ required: true, message: 'Por favor, insira o nível do usuário' }]}>
                <Select placeholder="Selecione um nível de acesso">
                  {optionsLevel.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}