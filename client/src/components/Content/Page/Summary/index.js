import React, { useEffect, useState } from "react";
import PersonDetails from "./PersonDetails";
import axios from "axios";

export default function Summary(props) {
  const [users, setUsers] = useState([]);
  // const usersList = (users) => {
  //   return users.map((user) => {
  //     return <PersonDetails user={user} />;
  //   });
  // };

  useEffect(() => {
    axios
      .get(`/api/users/${props.user.home_id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [users, props]);

  return (
    <ul
      style={{
        textAlign: "left",
        listStyle: "none",
      }}
    ></ul>
  );
}
