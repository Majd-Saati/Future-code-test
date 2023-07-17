import { Table } from "react-bootstrap";
import AdListItem from "./AdListItem";

const AdsList = ({data, loading, error}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th  style={{ width: "10%" }}>#</th>
          <th style={{ width: "10%" }}>Title</th>
          <th style={{ width: "30%" }}>Description</th>
          <th style={{ width: "20%" }}>Link</th>
          <th style={{ width: "10%" }}>Image</th>
          <th style={{ width: "10%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <AdListItem data={data} loading={loading} error={error} />
      </tbody>
    </Table>
  );
};

export default AdsList;
