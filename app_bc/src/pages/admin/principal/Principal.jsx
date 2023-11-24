import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import axios from "axios";
import TabelaUsuarios from "@/components/TabelaUsuarios";
import TabelaArtigos from "@/components/TabelaArtigos";

function Principal(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Chamada à API para obter dados
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/consultar");
        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <TabelaUsuarios />
        </Col>
        <Col span={24}>
          <TabelaArtigos />
        </Col>
      </Row>
    </Card>
  )
}  
export default Principal;