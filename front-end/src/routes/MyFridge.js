import React, { useState, useEffect } from 'react';
import "./MyFridge.css";

const fetchItems = async (setFridgeItems) => {
    try {
        const response = await fetch('http://localhost:3001/fridge');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFridgeItems(data);
        console.log('Fetched fridge items: ', data);
    } catch (error) {
        console.error("Fetching fridge items failed: ", error);
    }
};

function MyFridge() {
    const example_apple_item = {
        name: 'Apples',
        quantity: 3,
        purchasedDate: '2023-11-05',
        expiration: '2023-11-21'
    };
    const example_egg_item = {
        name: 'Eggs',
        quantity: 14,
        purchasedDate: '2023-11-01',
        expiration: '2023-11-30'
    };
    const example_milk_item = {
        name: 'Horizon 2% Milk',
        quantity: 1,
        purchasedDate: '2023-11-09',
        expiration: '2023-11-19'
    };
    const example_port_belly_item = {
        name: 'Pork Belly',
        quantity: 1,
        purchasedDate: '2023-11-09',
        expiration: '2023-11-16'
    }
    const example_beef_item = {
        name: 'Beef',
        quantity: 2,
        purchasedDate: '2023-11-09',
        expiration: '2023-11-16'
    };
    const example_cheese_item = {
        name: 'Cheese',
        quantity: 2,
        purchasedDate: '2023-11-13',
        expiration: '2023-12-28'
    };
    const example_lettuce_item = {
        name: 'Fresh Lettuce',
        quantity: 1,
        purchasedDate: '2023-11-01',
        expiration: '2023-11-11'
    };

    const [fridgeItems, setFridgeItems] = useState([example_apple_item, example_beef_item, example_cheese_item, example_egg_item, example_lettuce_item, example_milk_item, example_port_belly_item]);

    const [newItem, setNewItem] = useState({ name: '', quantity: '', purchasedDate: '', expiration: '' });
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [clickedItem, setClickedItem] = useState()

    const [editedName, setEditedName] = useState('');
    const [editedQuantity, setEditedQuantity] = useState('');
    const [editedExpiration, setEditedExpiration] = useState('');
    const [editedPurchasedDate, setEditedPurchasedDate] = useState('');
    const [isEditingItem, setIsEditingItem] = useState(false);

    const handleItemClick = (item) => {
        setClickedItem(item);
        setEditedName(item.name);
        setEditedQuantity(item.quantity);
        setEditedPurchasedDate(item.purchasedDate);
        setEditedExpiration(item.expiration);
        // setIsEditingItem(false);
    }

    const handleDeleteItem = () => {
        setFridgeItems(fridgeItems.filter(item => item !== clickedItem));
        setClickedItem(null);
        // setIsEditingItem(false);
    }

    const handleEditItem = () => {
        setIsEditingItem(true);
    };

    const handleAddItem = () => {
        setIsAddingItem(true);
    };

    const handleSaveEdit = async () => {
        if (!clickedItem) {
            return;
        }

        const itemIndex = fridgeItems.findIndex(item => item === clickedItem);

        const editedItem = {
            name: editedName,
            quantity: editedQuantity,
            purchasedDate: editedPurchasedDate,
            expiration: editedExpiration
        };

        const updatedFridgeItems = [...fridgeItems];
        updatedFridgeItems[itemIndex] = editedItem;

        setFridgeItems(updatedFridgeItems);
        setClickedItem(null);
        setIsEditingItem(false);
        
        let user = {}
        if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        }
        user.ingredients = updatedFridgeItems;
        localStorage.setItem('user', JSON.stringify(user));
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
              const response = await fetch('http://localhost:3001/fridge');
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setFridgeItems(data);  
              console.log('Fetched fridge items: ', data);
            } catch (error) {
              console.error("Fetching fridge items failed: ", error);
            }
          };
        fetchItems();
    }, [setFridgeItems]);
    
    const handleSaveNewItem = async () => {
        try {
            // Ensure that new item's fields are filled
            if (!newItem.name || !newItem.quantity || !newItem.purchasedDate || !newItem.expiration) {
                alert('Please fill in all fields');
                return;
            }

            // Send a POST request to the backend API to add the new item
            const response = await fetch('http://localhost:3001/fridge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Item added successfully');

            // Fetch items after successfully adding a new item
            await fetchItems(setFridgeItems);

            setIsAddingItem(false);
            setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to add item. Please try again.');
        }
        setFridgeItems(prevItems => [...prevItems, newItem]);  // Update state directly
        setIsAddingItem(false);
        setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });

        
        let user = {}
        if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        }
        user.ingredients = fridgeItems;
        localStorage.setItem('user', JSON.stringify(user));
      };

    const handleCancelAdd = () => {
        setIsAddingItem(false);
        setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });
    };

    return (
        <div>
            <h1 className="header">My Fridge</h1>
            <div className="background">
            </div>
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
                        placeholder="Purchased Date"
                        value={editedPurchasedDate}
                        onChange={(e) => setEditedPurchasedDate(e.target.value)}
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
                    <p>Purchased Date: {clickedItem.purchasedDate}</p>
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
                        placeholder="Purchased Date"
                        value={newItem.purchasedDate}
                        onChange={(e) => setNewItem({ ...newItem, purchasedDate: e.target.value })}
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
