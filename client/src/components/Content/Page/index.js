import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Table from "./Table";
import Summary from "./Summary";
import AddEntry from "./AddEntry.js";
import EditHistory from "./EditHistory";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

export default function Page(props) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (!["login", "logout", "register"].includes(props.mode)) {
      axios
        .get(`/api/entries/${props.mode}/${props.user["home_id"]}`)
        .then((response) => {
          setTableRows(response.data);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [props]);

  return (
    <Fragment>
      <Breadcrumb mode={props.mode} month={"August"} />
      <div
        style={{
          display: "flex",
          flexDirection: `${isMobile ? "column" : "row"}`,
          alignItems: `${isMobile ? "center" : "start"}`,
          justifyContent: `${isMobile ? "space-between" : "center"}`,
          padding: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: `${isMobile ? "90%" : "50%"}`,
          }}
        >
          <Table rows={tableRows} mode={props.mode} user={props.user} />
          <div>
            <AddEntry
              rows={tableRows}
              setRows={setTableRows}
              mode={props.mode}
              user={props.user}
            />
            <Summary user={props.user} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: `${isMobile ? "90%" : "40%"}`,
          }}
        >
          <EditHistory />
        </div>
      </div>
    </Fragment>
  );
}
