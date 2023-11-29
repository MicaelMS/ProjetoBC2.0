import React from "react";
import { Button, Col, Image, Layout, Row } from "antd";
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

export default function NavHome() {
  return (
    <Header style={{ backgroundColor: "#1474fb", padding: "0 20px", height: 70 }}>
      <Row justify="space-between"
        gutter={[10, 10]}>
        <Col>
          <div className="logo" style={{ fontSize: "1.5em", color: "#fff" }}>
            <Image width={60}
              height={60}
              preview={false}
              src='/Logo.png' />
          </div>
        </Col>
        <Col>
          <Button icon={<HomeOutlined style={{ color: '#ffff', marginTop: 20 }} />}
            type=''
            href="/" />
        </Col>
        <Col>
          <Link href="../login" passHref>
            <Button type="primary"
              icon={<LoginOutlined />}
              style={{backgroundColor: '#1f3c63'}}>
              Login
            </Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
}
