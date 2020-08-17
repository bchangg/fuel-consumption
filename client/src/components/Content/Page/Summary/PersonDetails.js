import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PersonDetails(props) {
  const { user } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`/${user.id}/contribution`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <li>
      <b>
        {user.first_name} {user.last_name}
      </b>{" "}
      contributions: {amount}
    </li>
  );
}
