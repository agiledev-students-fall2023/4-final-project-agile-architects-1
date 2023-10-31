import React, { useState, useEffect } from 'react';
import "./MyFridge.css";

function MyFridge() {
    const [fridgeItems, setFridgeItems] = useState([
        //example
        { name: 'Item 1', quantity: 8, expiration: '2023-12-10' },
        { name: 'Item 2', quantity: 5, expiration: '2023-11-19' },
        { name: 'Item 3', quantity: 18, expiration: '2023-11-10' },
        { name: 'Item 4', quantity: 25, expiration: '2023-12-19' },
    ]);

    const [newItem, setNewItem] = useState({ name: '', quantity: '', expiration: '' });

    const [isAddingItem, setIsAddingItem] = useState(false); 

    const handleAddItem = () => {
        setIsAddingItem(true); 
    };

    const handleCancelAdd = () => {
        setIsAddingItem(false); 
        setNewItem({ name: '', quantity: '', expiration: '' }); 
    };

    const handleSaveNewItem = () => {
        if (!newItem.name || !newItem.quantity || !newItem.expiration) {
            alert('Please fill in all fields');
            return;
        }

        setFridgeItems([...fridgeItems, newItem]);

        setIsAddingItem(false); 
        setNewItem({ name: '', quantity: '', expiration: '' }); 
    };

    return (
        <div>
            <h1>My Fridge</h1>
            <div className="fridge-grid">
                {fridgeItems.map((item, index) => (
                    <div key={index} className="fridge-item">
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Expiration Date: {item.expiration}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleAddItem}>Add Item</button>
            {isAddingItem && (
                <div className="add-item-modal">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Expiration Date"
                        value={newItem.expiration}
                        onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })}
                    />
                    <button onClick={handleSaveNewItem}>Save</button>
                    <button onClick={handleCancelAdd}>Cancel</button>
                </div>
            )}
        </div>
    );
}



// return (
// <h1>Welcome to the Fridge page!</h1>
// );
//   };


export default MyFridge;
