import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import axios from "axios";
import { setuserdata } from "../redux/action/userAction";
function KTableListing() {
  const userdata = useSelector((state) => state.allUserData.userdata);
  const [userName, setfliterName] = useState("");
  const [count, setcount] = useState(10);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const response = await axios
      .get(`https://api.punkapi.com/v2/beers?page=1&per_page=${count}`)
      .catch((err) => {
        console.log(err);
      });

    dispatch(setuserdata(response.data));
    setcount(response.data.length);
  };

  const pagecountPluse=()=>{
        setcount(count+10);
  }
  const pagecountMinus=()=>{
    setcount(count-10);
}

// passing count





  useEffect(() => {
    fetchUserData();
  }, []);

  const renderList = userdata
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
          <table class="table">
            <thead class="thead-dark">
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
            <div class="card-header">
              <h5 className="display3">KaayLabs</h5>
            </div>
            <div className="card-body ">
              <h5 class="card-title">Table Filter</h5>
              <div className="text-center">
                <input
                  type="search"
                  placeholder="Search by Name.."
                  onChange={(e) => setfliterName(e.target.value)}
                />
              </div>

              <div className="text-end mt-5">
                <p>
                  <strong>1</strong>of <strong>{count}</strong>{" "}
                </p>
                {count === 10 ? (
                  <button type="button" class="btn btn-outline-dark" disabled>
                    {"<"}
                  </button>
                ) : (
                  <button type="button" class="btn btn-outline-dark" onClick={(e)=>setcount(count-10)}>
                    {"<"}
                  </button>
                )}
                {"       "}

                <button type="button" class="btn btn-outline-dark" onClick={(e)=>setcount(count+10)}>
                  {">"}
                </button>
              </div>
              <br />
              <br />
              <>{renderList}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KTableListing;
