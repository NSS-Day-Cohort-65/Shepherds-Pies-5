import { useState } from "react";
import OrderDetails from "./OrderDetails.js";
import OrderList from "./OrderList.js";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Orders() {

  const navigate = useNavigate();

  return (
    <div className="container">
       <Button
          color="dark"
          onClick={() => {
            navigate(`orders/create`)
          }}
        >
          Create Order
        </Button>
      <div className="row">
        <div className="col-sm-8">
          <OrderList />
        </div>
      </div>
    </div>
  );
}
