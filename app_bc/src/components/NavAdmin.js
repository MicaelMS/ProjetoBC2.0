import { Button, Col, Divider, Image, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";

export default function NavAdmin() {
  return (
    <Header style={{ backgroundColor: "#1474fb", padding: "0 20px", height: 70 }}>
      <Row justify='space-between'>
        <Col>
          <Link className="navbar-brand" href="#">
            <div className="logo" style={{ fontSize: "1.5em", color: "#fff" }}>
              <Image width={60}
                height={60}
                preview={false}
                src='/Logo.png' />
            </div>
          </Link>
        </Col>
        <Col>
          <Button href="/"
            style={{ backgroundColor: 'darkorange' }}
            type="primary">
            Logout
          </Button>
        </Col>
      </Row>
    </Header>
  )
}
