import { Button, ButtonGroup, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import empty from "../assets/empty.jpg";
import { deleteAds } from "../store/adsSlice";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import {  useNavigate } from "react-router-dom";
const AdListItem = ({ data, loading, error }) => {
  const [userToken, setUserToken] = useState("");
  const [adsRecords, setAdsRecords] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setAdsRecords(data);

    setUserToken(localStorage.getItem("token"));
  }, [data, adsRecords]);

  const deleteHandler = (id) => {
    dispatch(deleteAds({ id, userToken }))
      .unwrap()
      .then(() => {
        // Update the UI by removing the deleted record from the state
        setAdsRecords((prev) => prev.filter((record) => record.id !== id));
      })
      .catch((error) => {
        alert(error.mesaage);
      });
  };

  const ads =
    adsRecords &&
    adsRecords.map((el, idx) => (
      <tr key={el.id}>
        <td>#{++idx}</td>
        <td>{el.title_en}</td>
        <td>{el.description_en}</td>
        <td>{el.link || "Empty"}</td>
        <td>
          <Image className="w-75 rounded " src={el.image || empty} />
        </td>
        <td>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="success"
              onClick={() => navigate(`ads/${el.id}/edit`)}
            >
              Edit
            </Button>
            <Loading loading={loading} error={error}>
              <Button variant="danger" onClick={() => deleteHandler(el.id)}>
                Delete
              </Button>
            </Loading>
          </ButtonGroup>
        </td>
      </tr>
    ));
  return <>{ads}</>;
};

export default AdListItem;
