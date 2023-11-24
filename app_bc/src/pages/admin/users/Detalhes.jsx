import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd'
import Axios from 'axios';

export default function Detalhes({ usuario, children }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('usuario',usuario)
    form.setFieldsValue({...usuario})
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

  const [message, setMensage] = useState({ message: "", status: "" });//nao esta sendo usado

  const optionsLevel = [
    { value: 'admin', text: 'Administrador' },
    { value: 'user', text: 'Usuário' },
    { value: 'reader', text: 'Leitor' },
  ];

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  const onCancel = () => {
    console.log('teste')
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

      if (codigo) {
        const response = await Axios.put('http://localhost:4000/user/editar', { ...formData });
      }
      else {
        const response = await Axios.post('http://localhost:4000/user/salvar', { ...formData });
      }
      setMensage({ message: response.data.message, status: "ok" });
      onCancel();
    } catch (error) {
      console.error('Erro ao criar o Usuário:', error);
      setMensage({ message: "Erro ao criar o Usuário!", status: "error" });
    }
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <Modal
        open={visible}
        title="Cadastrar Usuário"
        okText="Cadastrar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={handleCreate}>
        <Form form={form} layout="vertical">
          <Form.Item name="author_name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome do usuário' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author_email"
            label="E-mail"
            rules={[
              { required: true, message: 'Por favor, insira o e-mail do usuário' },
              { type: 'email', message: 'E-mail inválido' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="author_user"
            label="Usuário Login"
            rules={[{ required: true, message: 'Por favor, insira o usuário' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author_pwd"
            label="Senha Login"
            rules={[{ required: true, message: 'Por favor, insira a senha do usuário' }]}>
            <Input.Password />
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
}