import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import './Member.scss';
import { useAuth } from '../../context/auth';
import titleImgMember from '../../data/images/greenwave64x24.png';
import Swal from 'sweetalert2';

const MemberCourseOrder = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const { auth, setAuth } = useAuth();

  // 為了處理網址
  let navigate = useNavigate();

  async function handleDelete(id) {
    const { isConfirmed } = await Swal.fire({
      title: '您確定要刪除課程紀錄嗎?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff7f6a',
      cancelButtonColor: '#17a8a2',
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    });
    if (!isConfirmed) {
      return;
    }
    let response = await axios.post(
      `${API_URL}/member/member-courseorder/${id}/delete`
    );
    console.log(response.data);
    if (response.data.isDeleted) {
      setData(data.filter((course) => course.id !== id));
    }
  }

  async function getMemberCourseOrderList(page = 1) {
    let response = await axios.get(
      `${API_URL}/member/member-courseorder/${auth.member_id}?page=${page}`
    );

    let courses = [];
    response.data.data.forEach(function (courseData) {
      courses.push(courseData);
    });

    setData([]);
    setData(courses);
    setPages(response.data.pagination.pages);
  }

  function changePage(page) {
    setCurrentPage(page);
    getMemberCourseOrderList(page);
  }

  useEffect(() => {
    getMemberCourseOrderList();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <h2 className="mb-5 titleMember text-center">
            <span className="me-2">
              <img src={titleImgMember} className="titleImgMember" />
            </span>
            課程紀錄
          </h2>
          <div className="d-flex mt-3">
            <h3 className="fs-20Member">課程查詢</h3>
          </div>
          <div className="orderTableWrapMember mb-3">
            <Table
              responsive
              hover
              className="table table-control align-middle text-center tableOrderCourseMember"
            >
              <thead>
                <tr>
                  <th></th>
                  <th className="fs-20Member text-nowrap">訂單號碼</th>
                  <th
                    className="fs-20Member text-nowrap"
                    style={{ minWidth: '120px' }}
                  >
                    訂單日期
                  </th>
                  <th className="fs-20Member text-nowrap">合計</th>
                </tr>
              </thead>
              <tbody>
                {data.map((course_order) => {
                  return (
                    <tr key={course_order.courseDate}>
                      <td className="text-nowrap">
                        <Link
                          to={`/member/member-courseorder/${course_order.id}`}
                          className="deepblue me-3"
                          target="_blank"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </Link>
                        <span
                          className="deleteIconMember orange"
                          onClick={() => {
                            handleDelete(course_order.id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </td>
                      <td>{course_order.id}</td>
                      <td>{course_order.courseDate}</td>
                      <td>{course_order.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <nav aria-label="pageMember">
            <ul className="d-flex justify-content-center mt-5">
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => changePage(1)}
                  href="#/"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              {Array.from(Array(pages).keys()).map((p) => {
                return (
                  <li className="page-item">
                    <a
                      className={
                        currentPage === p + 1
                          ? 'active page-link pageLinkMember'
                          : 'page-link pageLinkMember'
                      }
                      onClick={() => changePage(p + 1)}
                      href="#/"
                    >
                      {p + 1}
                    </a>
                  </li>
                );
              })}
              <li class="page-item">
                <a
                  class="page-link"
                  href="#/"
                  aria-label="Next"
                  onClick={() => changePage(pages)}
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

export default MemberCourseOrder;
