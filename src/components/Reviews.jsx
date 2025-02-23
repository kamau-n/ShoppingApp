import { useState } from "react";
import { Rating } from "./Rating";

export const Reviews = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold my-5">Customer Reviews</h2>
      <Rating rating={rating} setRating={setRating} />
    </div>
  );
};