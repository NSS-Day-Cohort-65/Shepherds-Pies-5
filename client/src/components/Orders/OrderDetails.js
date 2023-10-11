import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText } from "reactstrap";
import { getOrderById } from "../../managers/orderManager"; 
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const getOrderDetails = () => {
    getOrderById(id).then(setOrder);
  };

  useEffect(() => {
      getOrderDetails();
  }, [id]);

  if (!order) {
    return (
      <>
        <h2>Order Details</h2>
        <p>Please choose an order...</p>
      </>
    );
  }

  return (
    <>
      <h2>Order Details</h2>
      <Card color="dark" inverse>
        <CardBody>
          <CardTitle tag="h4">Order ID: {order.id}</CardTitle>
          <CardSubtitle>Employee: {order?.employee?.firstName}</CardSubtitle>
          <CardText>
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </CardText>
          <CardText>Tip: ${order.tip || "N/A"}</CardText>
          <CardText>Table Number: {order.tableNumber || "N/A"}</CardText>
        </CardBody>
      </Card>
      <h4>Pizzas</h4>
      {order?.pizzas?.map((pizza, index) => (
        <Card
          outline
          color="success"
          key={index}
          style={{ marginBottom: "4px" }}
        >
          <CardBody>
            <CardTitle tag="h5">Pizza {index + 1}</CardTitle>
            <CardText>Size: {pizza?.pizzaSize?.title}</CardText>
            <CardText>Sauce: {pizza?.pizzaSauce?.title}</CardText>
            <CardText>Cheese: {pizza?.pizzaCheese?.title}</CardText>
            <CardText>Toppings: {pizza?.pizzaToppings?.map((pizzaTopping) => (
              <div key={pizzaTopping.topping.id}>
                {pizzaTopping.topping.title}
              </div> 
            ))}</CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
