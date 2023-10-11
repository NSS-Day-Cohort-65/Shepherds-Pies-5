import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";



export default function OrderCard({ order }) {

  const navigate = useNavigate();

  return (
    <Card color="dark" outline style={{ marginBottom: "4px" }}>
      <CardBody>
        <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Employee ID: {order.employeeId}
        </CardSubtitle>
        <CardText>
          Order Date: {new Date(order.orderDate).toLocaleDateString()}
        </CardText>
        <CardText>Tip: ${order.tip || "N/A"}</CardText>
        <CardText>Table Number: {order.tableNumber || "N/A"}</CardText>
        <Button
          color="dark"
          onClick={() => {
            navigate(`orders/${order.id}`)
          }}
        >
          Show Details
        </Button>
      </CardBody>
    </Card>
  );
}
