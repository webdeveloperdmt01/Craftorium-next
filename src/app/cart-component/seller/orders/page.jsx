// 'use client';
// import React, { useEffect, useState } from "react";
// import { assets, orderDummyData } from "@/assets/assets";
// import Image from "next/image";
// import { useAppContext } from "@/context/AppContext";
// import Loading from "@/components/Loading";

// const Orders = () => {
//     const { currency } = useAppContext();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchSellerOrders = async () => {
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             setOrders(orderDummyData);
//         } catch (err) {
//             setError('Failed to fetch orders');
//             console.error('Error fetching orders:', err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchSellerOrders();
//     }, []);

//     if (loading) {
//         return <Loading />;
//     }

//     if (error) {
//         return (
//             <div className="flex-1 h-screen overflow-scroll flex items-center justify-center">
//                 <div className="text-red-500">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex-1 h-screen overflow-scroll">
//             <div className="md:p-10 p-4 space-y-5">
//                 <h2 className="text-lg font-medium">Orders</h2>
//                 <div className="max-w-4xl rounded-md">
//                     {orders.length === 0 ? (
//                         <div className="text-center py-10">
//                             <p>No orders found</p>
//                         </div>
//                     ) : (
//                         orders.map((order, index) => (
//                             <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300">
//                                 <div className="flex-1 flex gap-5 max-w-80">
//                                     <Image
//                                         className="max-w-16 max-h-16 object-cover"
//                                         src={assets.box_icon}
//                                         alt="box_icon"
//                                         width={64}
//                                         height={64}
//                                     />
//                                     <p className="flex flex-col gap-3">
//                                         <span className="font-medium">
//                                             {order.items.map((item) => 
//                                                 `${item.product.name} x ${item.quantity}`
//                                             ).join(", ")}
//                                         </span>
//                                         <span>Items: {order.items.length}</span>
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p>
//                                         <span className="font-medium">{order.address.fullName}</span>
//                                         <br />
//                                         <span>{order.address.area}</span>
//                                         <br />
//                                         <span>{`${order.address.city}, ${order.address.state}`}</span>
//                                         <br />
//                                         <span>{order.address.phoneNumber}</span>
//                                     </p>
//                                 </div>
//                                 <p className="font-medium my-auto">{currency}{order.amount}</p>
//                                 <div>
//                                     <p className="flex flex-col">
//                                         <span>Method: COD</span>
//                                         <span>Date: {new Date(order.date).toLocaleDateString()}</span>
//                                         <span>Payment: Pending</span>
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Orders;