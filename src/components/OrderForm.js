import React, { useState } from "react";

const OrderForm = ({ onOrderSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    reference: "",
    nom_client: "",
    telephone: "",
    telephone_2: "",
    adresse: "",
    code_postal: "",
    commune: "",
    code_wilaya: "",
    montant: "",
    remarque: "",
    produit: "",
    boutique: "",
    type: "",
    stop_desk: "0",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOrderSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center blur-background z-50">
      <div className="bg-white rounded-lg p-8 shadow-md relative">
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}> 
  
             <div className="mb-4">
            <label className="text-lg mb-2">Name: </label>
            <input
              className="w-64 p-2 mb-4 border border-gray-300 rounded"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            </div>
            <div className="mb-4">
            <label className="text-lg mb-2">Phone1: </label>
            <input
              className="w-64 p-2 mb-4 border border-gray-300 rounded"
              type="number"
              name="phone1"
              value={formData.phone1}
              onChange={handleInputChange}
            />
            </div>
            <div className="mb-4">
            <label className="text-lg mb-2">Phone2: </label>
            <input
              className="w-64 p-2 mb-4 border border-gray-300 rounded"
              type="number"
              name="phone2"
              value={formData.phone2}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
          <label className="text-lg mb-2">Address: </label>
          <input
            className="w-64 p-2 mb-4 border border-gray-300 rounded"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <label className="text-lg mb-2">Allowance: </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="option1"
                name="type"
                value="0"
                checked={formData.type === "0"}
                onChange={handleInputChange}
              />
              <label htmlFor="option1">A Domicile</label>
              <input
                type="radio"
                id="option2"
                name="type"
                value="1"
                checked={formData.type === "1"}
                onChange={handleInputChange}
              />
              <label htmlFor="option2">Stop Desk</label>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              type="submit"
            >
              Order Now
            </button>
            <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrderForm;
