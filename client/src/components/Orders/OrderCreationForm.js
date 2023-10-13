import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { createOrder } from "../../managers/orderManager";
import { getUsers } from "../../managers/userProfileManager";


export const OrderCreationForm = () => {

    const [showPart1, setShowPart1] = useState(false);
    const [showPart2, setShowPart2] = useState(false);
    const [userProfiles, setUserProfiles] = useState([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
    const [selectedDriverId, setSelectedDriverId] = useState("")
    const [selectedTableNumber, setSelectedTableNumber] = useState("")

    const navigate = useNavigate()

    const getAllUserProfiles = () => {
        getUsers().then(setUserProfiles); // Replace getOrders with your actual method to fetch orders
      };
    
      useEffect(() => {
        getAllUserProfiles();
      }, []);


      const handleButtonClick = (part) => {
        if (part === 1) {
          setShowPart1(true);
          setShowPart2(false);
        } else if (part === 2) {
          setShowPart1(false);
          setShowPart2(true);
        }
      };




    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const orderToPost = {
            employeeId: selectedEmployeeId,
            driverId: selectedDriverId,
            tableNumber: selectedTableNumber, 
            
        };

        createOrder(orderToPost)
        .then(() => {
            navigate("/orders"); // This ensures navigation happens after order creation
        });
    
    };

    return <>
        <div className="orderCreationFormContainer">
        <Button onClick={() => handleButtonClick(1)}>Show Part 1</Button>
        <Button onClick={() => handleButtonClick(2)}>Show Part 2</Button>
        <div className="orderCreationForm">
            <h2 className="orderFormTitle">Create A New Order</h2>
            <Form>
                <FormGroup>
                    <Label for="employeeSelect">Employee</Label>
                    <Input 
                    type="select" 
                    name="employee" 
                    value={selectedEmployeeId}
                    onChange={(e) => {
                        setSelectedEmployeeId(parseInt(e.target.value))}}
                    >
                    <option value="0">Choose an Employee</option>
                    {userProfiles.map((userProfile) => (
                    <option value={userProfile.id} key={userProfile.id}>{userProfile.firstName} {userProfile.lastName}</option>
                    ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="driverSelect">Driver</Label>
                    <Input type="select" 
                    name="driver" 
                    value={selectedDriverId}
                    onChange={(e) => {
                        setSelectedDriverId(parseInt(e.target.value))}}
                    >
                    <option value="0">Choose a Driver</option>
                    {userProfiles.map((userProfile) => (
                    <option value={userProfile.id} key={userProfile.id}>{userProfile.firstName} {userProfile.lastName}</option>
                    ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="tableNumber">Select Table Number</Label>
                    <Input 
                    type="number" 
                    name="table" 
                    placeholder="Enter a table number...." 
                    value={selectedTableNumber}
                    onChange={(e) => {
                        setSelectedTableNumber(parseInt(e.target.value))}}      
                    />
                </FormGroup>
                <Button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
                    Create Order
                </Button>
            </Form>
        </div>
        </div>
    </>
}