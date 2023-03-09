import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { galleryImage } from "../image";

const Shipment = (props) => {
  const [shipment, setShipment] = useState();

  const getShipment = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/allshipment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({ id: props.emailId }),
      });
      const data = await res.json();
      console.log(data);
      setShipment(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getShipment()
  }, [])

  const deleteShipment = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/deleteshipment", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({ emailId: props.emailId, cartId: id }),
      });
      const data = await res.json();
      console.log(data);
      setShipment(shipment.filter((item, index) => item.cardid === index));

      if (data === "shipment cancelled") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-7xl">Shipment</h2>
      {shipment && (
        <div className="grid gap-2 lg:grid-cols-4">
          {shipment.map((item, index) => (
            <div
              className="w-full rounded-lg shadow-md lg:max-w-sm"
              key={index}
            >
              <div>
                <img
                  src={galleryImage[item.itemid - 1]}
                  alt=""
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-blue-600">
                    {item.cart_item}
                  </h4>
                  <p className="mb-2 leading-normal">{item.description}</p>
                </div>
              </div>
              {/* <div className="px-4 py-2 text-sm text-red-500">
                <button onClick={() => deleteFav(item.itemid)}>DELETE</button>
              </div> */}
            </div>
          ))}
          <button onClick={() => deleteShipment(shipment[0].cartid)}>
            DELETE
          </button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {/* <button onClick={() => getShipment()}>All Shipment</button> */}
          {shipment &&
            shipment.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.cart_item}</td>
                  <td>
                    <img src={galleryImage[item.itemid - 1]} alt="test" />
                  </td>
                </tr>
              );
            })}
          <td>
            <button onClick={() => deleteShipment(shipment[0].cartid)}>
              DELETE
            </button>
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default Shipment;
