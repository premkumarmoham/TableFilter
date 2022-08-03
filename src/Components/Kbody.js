import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import axios from "axios";
import { setuserdata } from "../redux/action/userAction";
import ReactPaginate from "react-paginate";
function KTableListing() {
  const userdata = useSelector((state) => state.allUserData.userdata);
  const [userName, setfliterName] = useState("");
  const [count, setcount] = useState(10);
  const [loading, SetLoadng] = useState(false);
  const [currentPage] = useState(1);
  const [postPrePage] = useState(10);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const response = await axios
      .get(`https://api.punkapi.com/v2/beers?page=1&per_page=10`)
      .catch((err) => {
        console.log(err);
      });
    SetLoadng(false);
    dispatch(setuserdata(response.data));
    SetLoadng(true);
  };

  const fetchCurrentData = async (currentpageData) => {
    const response = await axios
      .get(
        `https://api.punkapi.com/v2/beers?page=1&per_page=${currentpageData}`
      )
      .catch((err) => {
        console.log(err);
      });
    SetLoadng(false);
    // debugger
    let PrevCount = currentpageData - 10;
    dispatch(setuserdata(response.data.splice(PrevCount, currentpageData)));
    setcount(currentpageData);
    SetLoadng(true);
  };

  const handlePageClick = (data) => {
    let currentPageData = data.selected + 1;
    fetchCurrentData(currentPageData * 10);
  };

  const indexofLastData = currentPage * postPrePage;
  const indexofFirstData = indexofLastData - postPrePage;
  const currentData = userdata.slice(indexofFirstData, indexofLastData);

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderList = currentData
    .filter((userdata) => userdata.name.toLowerCase().includes(userName))
    .map((userdata) => {
      const {
        id,
        name,
        tagline,
        first_brewed,
        description,
        image_url,
      } = userdata;
      return (
        <div className="">
          <table className="table">
            <thead className="thead-dark">
              <tr className="table-primary">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Tag Line</th>
                <th scope="col">First_brewed</th>
                <th scope="col">description</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{tagline}</td>
                <td>{first_brewed}</td>
                <td>{description}</td>
                <td>
                  <img alt={tagline} src={image_url} width="50" height="60" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  return (
    <div>
      <Header />
      <div className="container">
        <div className="m-4">
          <div className="card">
            <div className="card-header">
              <h5 className="display3">KaayLabs</h5>
            </div>
            <div className="card-body ">
              <h5 className="card-title">Table Filter</h5>
              <div className="text-end mt-5">
                <div className="text-start ">
                  <div className="row">
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search by Name.."
                          onChange={(e) => setfliterName(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2">
                          &#128269;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  <strong>1</strong>of <strong>{count}</strong>{" "}
                </p>
              </div>
              {loading !== true ? (
                <div>
                  <h4>Loading... </h4>
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                </div>
              ) : (
                <>{renderList}</>
              )}
            </div>
            <div className="justify-content-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-items"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KTableListing;
