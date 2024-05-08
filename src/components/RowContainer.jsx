import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); 

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleFeedback = (itemId, stars) => {
    setFeedbacks({ ...feedbacks, [itemId]: stars }); 
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">Rs.</span>{" "}
                  {item?.price}
                </p>
              </div>

              
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.span
                    key={star}
                    whileHover={{ scale: 1.2, color: "#FFD700" }} 
                    onClick={() => handleFeedback(item.title, star)} 
                    style={{ cursor: "pointer", fontSize: "1.5rem", color: "#D3D3D3" }}
                  >
                    {star <= feedbacks[item.title] ? "★" : "☆"}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="Not Found" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}

      <div className="w-full mt-8 text-center"> 
        {Object.keys(feedbacks).length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Customers Feedbacks</h2>
            {Object.keys(feedbacks).map((itemTitle) => (
              <div key={itemTitle} className="text-gray-600 mt-2">
                <p className="text-lg font-semibold">{itemTitle}</p>
                <div className="flex items-center justify-center">
                  <p className="text-yellow-400 text-2xl mx-1">{feedbacks[itemTitle]} ★</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RowContainer;
