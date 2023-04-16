import React from "react";

export default function ({ data }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {data.map((product) => (
        <div className="mx-4 border-2 rounded-sm " key={product.id}>
          <img src={product.Link} alt="" className="w-full h-52" />
          <h2 className="font-mono px-2 py-3">{product.Name}</h2>
          <div className="flex my-3 mx-5 p-3 justify-between">
            <h2 className="p-3 text-xl font-bold">{product.Price}</h2>
            <button className="font-bold text-white px-5 py-2 bg-blue-700 rounded">
              add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
