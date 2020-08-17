import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function AddEntry(props) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    axios
      .post("/api/entries", {
        userId: props.user.id,
        homeId: props.user.home_id,
        category: props.mode,
        itemName,
        price,
      })
      .then((response) => {
        console.log(response);
        if (response.data["user"] !== undefined) {
          const { user, entry } = response.data;
          props.setRows([
            {
              id: entry.id,
              user: user.first_name,
              name: entry.name,
              price: entry.price,
              created_at: entry.created_at,
            },
            ...props.rows,
          ]);
          setItemName("");
          setPrice("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      className="add-entry-form"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "50px 50px",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        required
        id="item-name"
        label="Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <TextField
        required
        id="item-price"
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button color="primary" type="submit" onClick={handleSubmit}>
        Add Entry
      </Button>
    </form>
  );
}
