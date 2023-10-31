import React, { useState, useEffect } from 'react';
import "./MyFridge.css";

function MyFridge() {
    const [fridgeItems, setFridgeItems] = useState([]); // { name: 'Item 1', quantity: 8, expiration: '2023-12-10' }

    const [clickedItem, setClickedItem] = useState();

    const [newItem, setNewItem] = useState({ name: '', quantity: '', expiration: '' });

    const [isAddingItem, setIsAddingItem] = useState(false);

    const [editedName, setEditedName] = useState('');
    const [editedQuantity, setEditedQuantity] = useState('');
    const [editedExpiration, setEditedExpiration] = useState('');
    const [isEditingItem, setIsEditingItem] = useState(false);


    const handleItemClick = (item) => {
        setClickedItem(item);
        setEditedName(item.name);
        setEditedQuantity(item.quantity);
        setEditedExpiration(item.expiration);
    }

    const handleDeleteItem = () => {
        setFridgeItems(fridgeItems.filter(item => item !== clickedItem));
        setClickedItem(null);
    }

    const handleEditItem = () => {
        // Display an edit form
        setIsEditingItem(true);
    };

    const handleAddItem = () => {
        setIsAddingItem(true);
    };

    const handleSaveEdit = () => {
        if (!clickedItem) {
            return; 
        }
        // Find the index of the selected item in the array
        const itemIndex = fridgeItems.findIndex(item => item === clickedItem);

        // Create a new item with the edited details
        const editedItem = {
            name: editedName,
            quantity: editedQuantity,
            expiration: editedExpiration
        };

        // Update the fridge items array with the edited item
        const updatedFridgeItems = [...fridgeItems];
        updatedFridgeItems[itemIndex] = editedItem;

        // Update the state
        setFridgeItems(updatedFridgeItems);
        setClickedItem(null);
        setIsEditingItem(false);
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
                    <div
                        key={index}
                        className="fridge-item"
                        onClick={() => handleItemClick(item)}
                    >
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Expiration Date: {item.expiration}</p>
                        <button onClick={handleEditItem}>Edit</button>
                    </div>
                ))}
            </div>
            {clickedItem && isEditingItem ? (
                <div className="edit-item-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Expiration Date"
                        value={editedExpiration}
                        onChange={(e) => setEditedExpiration(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            ) : null}
            {clickedItem ? (
                <div className="view-item-details">
                    <p>Name: {clickedItem.name}</p>
                    <p>Quantity: {clickedItem.quantity}</p>
                    <p>Expiration Date: {clickedItem.expiration}</p>
                    <button onClick={handleEditItem}>Edit</button>
                    <button onClick={handleDeleteItem}>Delete</button>
                </div>
            ) : null}
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
