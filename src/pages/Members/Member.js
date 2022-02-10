import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import './Member.scss';

import MemberInfo from './MemberInfo';
import MemberOrder from './MemberOrder';

function Member() {
  return (
    <>
      <div className="memberWrap">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="container tabWrapMember">
            <Col className="tabBarMember" lg={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link className="fs-24Member linkWidthMember my-5">
                    您好,
                    <br />
                    歐陽范姜
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="first"
                  >
                    會員資料
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="second"
                  >
                    會員點數
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="third"
                  >
                    訂單查詢
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="fourth"
                  >
                    我的購物金
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="fifth"
                  >
                    我的優惠券
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="sixth"
                  >
                    我的收藏
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="fs-24Member linkWidthMember mb-4"
                    eventKey="seventh"
                  >
                    留言
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="tabContentMember" lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <MemberInfo />
                </Tab.Pane>
                <Tab.Pane eventKey="second"></Tab.Pane>
                <Tab.Pane eventKey="third">
                  <MemberOrder />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
export default Member;