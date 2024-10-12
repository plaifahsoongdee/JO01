import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import OverviewCard from './OverviewCard';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import LatestProducts from './LatestProducts';
import LatestOrders from './LatestOrders';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';

function DashboardLayout() {
  const [selectedTab, setSelectedTab] = useState("รายรับ");
  const [entries, setEntries] = useState({
    รายรับ: [],
    รายจ่าย: [],
    ยอดเงินคงเหลือ: [],
    ยอดเงินเก็บ: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddEntry = () => {
    const newEntry = { source, amount };
    setEntries((prevEntries) => ({
      ...prevEntries,
      [selectedTab]: [...prevEntries[selectedTab], newEntry],
    }));
    setSource("");
    setAmount("");
    setShowModal(false);
  };

  const openModal = (tab) => {
    setSelectedTab(tab);
    setShowModal(true);
  };

  const dashboardContainerStyle = {
    display: "flex",
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const sidebarStyle = {
    backgroundColor: "#F8E7EF",
    color: "#333",
    width: "240px",
    minHeight: "100vh",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    position: "fixed",
    top: 0,
    left: 0,
  };

  const contentStyle = {
    flex: 1,
    padding: "2rem",
    marginLeft: "260px",
  };

  const cardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
    marginTop: "1rem",
  };

  return (
    <div style={dashboardContainerStyle}>
      <div style={sidebarStyle}>
        <Sidebar onSelectTab={setSelectedTab} />
      </div>
      <div style={contentStyle}>
        <Header />
        <div style={cardGridStyle}>
          <OverviewCard title="รายรับ" value="$24k" percentage={12} onClick={() => openModal("รายรับ")} />
          <OverviewCard title="รายจ่าย" value="1.6k" percentage={-16} onClick={() => openModal("รายจ่าย")} />
          <OverviewCard title="ยอดเงินคงเหลือ" value="75.5%" onClick={() => openModal("ยอดเงินคงเหลือ")} />
          <OverviewCard title="ยอดเงินเก็บ" value="$15k" onClick={() => openModal("ยอดเงินเก็บ")} />
        </div>

        {/* ส่วนแสดงข้อมูลล่าสุด */}
        <div style={{ marginTop: "2rem" }}>
          <h4>รายการล่าสุดใน {selectedTab}</h4>
          <ul>
            {entries[selectedTab].length > 0 ? (
              entries[selectedTab].slice(-5).map((entry, index) => (
                <li key={index}>
                  ที่มา: {entry.source} | จำนวนเงิน: ${entry.amount}
                </li>
              ))
            ) : (
              <p>ไม่มีข้อมูล</p>
            )}
          </ul>
        </div>

        {/* โมดาลเพิ่มรายการ */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มรายการใหม่ใน {selectedTab}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ที่มาของรายรับ/รายจ่าย:</Form.Label>
                <Form.Control
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="กรอกที่มาของรายรับ/รายจ่าย"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>จำนวนเงิน:</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="กรอกจำนวนเงิน"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              ยกเลิก
            </Button>
            <Button variant="primary" onClick={handleAddEntry}>
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="w-100 mt-4">
          <Col md={6}><BarChart /></Col>
          <Col md={6}><DonutChart /></Col>
        </Row>
        <Row className="w-100 mt-4">
          <Col md={6}><LatestProducts /></Col>
          <Col md={6}><LatestOrders /></Col>
        </Row>
      </div>
    </div>
  );
}

export default DashboardLayout;
