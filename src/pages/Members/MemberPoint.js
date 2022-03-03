import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Tab,
  Row,
  Col,
  Nav,
  Collapse,
  Button,
  Table,
  Accordion,
} from 'react-bootstrap';
import axios from 'axios';
import './Member.scss';
import { API_URL } from '../../utils/config';
import { useAuth } from '../../context/auth';
import titleImgMember from '../../data/images/greenwave64x24.png';

const MemberPoint = () => {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);

  // 為了處理網址
  let navigate = useNavigate();

  // 把網址上的 :id 拿出來
  // const { order_id } = useParams();

  async function getMemberCourseOrderList(page = 1) {
    let response = await axios.get(
      `${API_URL}/member/member-point/${auth.member_id}?page=${page}`
    );

    let orders = [];
    response.data.data.forEach(function (orderData) {
      orders.push(orderData);
    });

    setData([]);
    setData(orders);
    setPages(response.data.pagination.pages);
  }

  function changePage(page) {
    getMemberCourseOrderList(page);
  }

  useEffect(() => {
    async function getMemberOrderList() {
      let response = await axios.get(
        `${API_URL}/member/member-order/${auth.member_id}`
      );

      let orders = [];
      let accumulated = 0;
      // reverse for accumulate
      response.data.reverse().forEach(function (orderData) {
        accumulated += orderData.amount;
        orderData.accumulated = accumulated;
        orders.push(orderData);
      });

      // reverse for display
      setData(orders.reverse());
    }

    getMemberOrderList();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row px-5">
          <div className="col-lg-12 col-md-12 col-12 mx-auto">
            <h2 className="mb-5 titleMember text-center">
              <span className="me-2">
                <img src={titleImgMember} className="titleImgMember" />
              </span>
              會員點數
            </h2>
            <div className="col-12 card cardMember mt-5 mb-3 p-4">
              <div className="row g-0">
                <div className="col-5 d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center align-items-center bellWrapMember">
                      <i className="fas fa-bell fasMember bellIconMember"></i>
                      <i className="fal fa-usd-circle"></i>
                    </div>
                    {data.map((order_list, i) => {
                      // only last order
                      if (i === 0) {
                        return (
                          <div className="d-flex justify-content-center align-items-center flex-column">
                            <p className="card-text fs-20Member">現有總點數</p>
                            <h3 className="fs-45Member">
                              {(order_list.accumulated / 200).toFixed()}
                              <span className="fs-20Member">點</span>
                            </h3>
                            <p className="card-text m-0 fs-20Member">
                              等值&nbsp;NT$
                              {(order_list.accumulated / 200).toFixed()}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="col-1 lineWrapMember">
                  <div className="lineMember"></div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <div className="d-flex justify-content-start align-items-center flex-column">
                    <p className="card-text fs-16Member">
                      消費&nbsp;NT$200&nbsp;可累計&nbsp;1&nbsp;點
                      <br />
                      1&nbsp;點可折抵&nbsp;NT$1。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-12 d-flex mt-4">
            <h3 className="fs-20Member p-0">點數紀錄</h3>
          </div>
          <div className="col-lg-12 col-12 table-wrap d-flex justify-content-center mb-5 p-0">
            <Table
              responsive="sm"
              className="table table-control align-middle text-center my-3 tableMemberOrder tableMemberPoint"
            >
              <thead>
                <tr>
                  <th className="fs-20Member" style={{ minWidth: '120px' }}>
                    日期
                  </th>
                  <th className="fs-20Member text-nowrap">點數更動原因</th>
                  <th className="fs-20Member text-nowrap">獲得點數</th>
                  <th className="fs-20Member text-nowrap">現有總點數</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item.order_time}>
                      <td className="text-nowrap">{item.order_time}</td>
                      <td className="text-nowrap">消費NT${item.amount}</td>
                      <td className="text-nowrap">
                        {(item.amount / 200).toFixed()}
                      </td>
                      <td className="text-nowrap">
                        {(item.accumulated / 200).toFixed()}
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td className="text-nowrap">2022-01-31</td>
                  <td className="text-nowrap">消費NT$7200</td>
                  <td className="text-nowrap">36</td>
                  <td className="text-nowrap">2022/12/31</td>
                  <td className="text-nowrap">57</td>
                </tr>
                <tr>
                  <td className="text-nowrap">2022-01-31</td>
                  <td className="text-nowrap">消費NT$7200</td>
                  <td className="text-nowrap">36</td>
                  <td className="text-nowrap orange">
                    2022/12/31<span className="orange">(已過期)</span>
                  </td>
                  <td className="text-nowrap orange">57</td>
                </tr> */}
              </tbody>
            </Table>
          </div>
          <nav aria-label="pageMember">
            <ul className="d-flex justify-content-center mt-5">
              <li class="page-item">
                <a
                  class="page-link pageLinkMember"
                  href="#/"
                  onClick={(e) => {
                    changePage(1);
                    navigate(1);
                  }}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              {Array.from(Array(pages).keys()).map((p) => {
                return (
                  <li className="page-item">
                    <a
                      className="page-link pageLinkMember"
                      onClick={(e) => changePage(p + 1)}
                    >
                      {p + 1}
                    </a>
                  </li>
                );
              })}
              <li class="page-item">
                <a
                  class="page-link pageLinkMember"
                  href="#/"
                  onClick={(e) => {
                    changePage(pages);
                    navigate({ pages });
                  }}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MemberPoint;
