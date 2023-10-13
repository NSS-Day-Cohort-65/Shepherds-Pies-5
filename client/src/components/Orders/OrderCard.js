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
import { deleteThisOrder } from "../../managers/orderManager";

export default function OrderCard({ order, getAllOrders }) {
  const navigate = useNavigate();

  //^ Function to delete an order
  const deleteOrder = (id) => {
    // Send an HTTP DELETE request to delete the work order
    deleteThisOrder(id) // this says, run the deleteThisWorkOrder function on the selected OrderId, which will run the DELETE method on that object in the database
      .then(() => {
        getAllOrders();
      })
  };

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
            navigate(`orders/${order.id}`);
          }}
        >
          Show Details
        </Button>

        <Button
          onClick={() => deleteOrder(order.id)}
          color="danger"
          style={{ marginLeft: "8px" }} // Add left margin for spacing
        >
          Delete Work Order
        </Button>
      </CardBody>
    </Card>
  );
}
