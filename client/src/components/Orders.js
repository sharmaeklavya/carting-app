import React, { useState, useEffect } from "react";
import Header from "./Header";
import baseApi from "../apis/baseApi";
import { Auth } from "../resuables/Auth";

function Orders() {
  const [orderList, setOrderList] = useState([]);

  const handleAuth = async () => {
    try {
      const response = await Auth.getToken();
      if (response) {
        const config = {
          headers: { authorization: `Bearer ${response.refreshToken}` },
        };
        const orders = await baseApi.post("api/orders/userorders", {}, config);
        setOrderList(orders.data);
      } else setOrderList([]);
    } catch (err) {
      console.error(err.response);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <hr className="straight-line" />
            <h5 className="section-title text-right">My Orders</h5>
          </div>
          <section className="border px-3 py-2">
            <div className="row justify-content-center align-items-center">
              {orderList.map((order) =>
                order.meals.map((meal, i) => (
                  <React.Fragment key={i}>
                    <div key={i} className="col-md-3">
                      <div className="card my-2">
                        <img
                          className="meal-img"
                          src={meal.mealImg}
                          alt={meal.mealName}
                        />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-4">
                          <p className="meal-title">Item : {meal.mealName}</p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Price : {meal.mealPrice}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Quantity : {meal.mealQuantity}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Subtotal : {order.totalPrice}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Date : {order.orderDate.split("T")[0]}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Time : {order.orderDate.split("T")[1]}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Payment? : {order.paymentStatus}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="meal-subtitle">
                            Delivery? : {order.deliveryStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Orders;
