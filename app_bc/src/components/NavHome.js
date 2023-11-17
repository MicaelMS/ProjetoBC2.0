import React from "react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { LoginOutlined, HomeOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

export default function NavHome() {
  return (
    <Header style={{ backgroundColor: "#000", padding: "0 20px" }}>
      <Row justify="space-between">
        <Col>
          <div className="logo" style={{ fontSize: "1.5em", color: "#fff" }}>
            Logo
          </div>
        </Col>
        <Col>
        <Link href="../login" passHref>
          <Button type="primary" icon={<LoginOutlined />}>
            Login
          </Button>
        </Link>
        </Col>
      </Row>
    </Header>
  );
}
