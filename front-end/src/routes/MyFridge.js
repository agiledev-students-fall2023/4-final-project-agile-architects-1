import React, { useState } from 'react';
import "./MyFridge.css";

function MyFridge() {
    // const [fridgeItems, setFridgeItems] = useState([]); // { name: 'Item 1', quantity: 8, expiration: '2023-12-10' }
    const [fridgeItems, setFridgeItems] = useState([{ name: 'Item 1', quantity: 8, expiration: '2023-11-10' }, { name: 'Item 2', quantity: 12, expiration: '2023-11-1' }, { name: 'Item 1', quantity: 8, expiration: '2023-11-10' }, { name: 'Item 3', quantity: 2, expiration: '2023-12-1' }, { name: 'Item 4', quantity: 1, expiration: '2023-12-10' }, { name: 'Item 5', quantity: 5, expiration: '2023-12-12' }]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', expiration: '' });
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [clickedItem, setClickedItem] = useState()

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
        setIsEditingItem(true);
    };

    const handleAddItem = () => {
        setIsAddingItem(true);
    };

    const handleSaveEdit = () => {
        if (!clickedItem) {
            return;
        }

        const itemIndex = fridgeItems.findIndex(item => item === clickedItem);

        const editedItem = {
            name: editedName,
            quantity: editedQuantity,
            expiration: editedExpiration
        };

        const updatedFridgeItems = [...fridgeItems];
        updatedFridgeItems[itemIndex] = editedItem;

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
            <h1 className="header">My Fridge</h1>
            <div className="background">
            <div className="centered-rectangle">
            </div></div>
            <div className="fridge-grid">
                {fridgeItems.map((item, index) => (
                    <div
                        key={index}
                        className="fridge-item"
                        onClick={() => handleItemClick(item)}
                    >
                        <p>{item.name}</p>
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
                    <button className="button" onClick={handleEditItem}>Edit</button>
                    <button className="button" onClick={handleDeleteItem}>Delete</button>
                </div>
            ) : null}
            <button className="add-button" onClick={handleAddItem}>Add Item</button>
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


export default MyFridge;
