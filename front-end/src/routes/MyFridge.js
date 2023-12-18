import React, { useState, useEffect } from 'react';
import "./MyFridge.css";
import { useAuthContext } from './hooks/useAuthContext';

function MyFridge() {
    const { user } = useAuthContext()
    const [profile, setProfile] = useState({username: "User"})

    useEffect(() => {
        const fetchUser = async (userId) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile/${userId}`)
            const json = await response.json()
            if (response.ok){
                // console.log(json)
              setProfile(json)
            }
          } catch(error){
            console.error('Error fetching profile: ', error)
          }
        };
    
        if (user){
          fetchUser(user.userId);
        }
        
    }, [user]);

    const example_item = {
        name: 'Example Item',
        quantity: 3,
        purchasedDate: '2023-11-05',
        expiration: '2023-11-21'
    };

    const [fridgeItems, setFridgeItems] = useState([example_item]);

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

    // Function to close the item details view
    const handleCloseDetails = () => {
        setClickedItem(null); 
    };

    // Function to close the add item popup view
    const handleCloseAdd = () => {
        setIsAddingItem(false);
    };

    // Function to stop the propagation of click events from inside the modal
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const fetchItems = async () => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user.fridgeItems) {
              // If there are no fridge items, set to default item
              user.fridgeItems = [example_item];
            }
            localStorage.setItem('user', JSON.stringify(user));
            setFridgeItems(user.fridgeItems);
          } else {
            // If no user in local storage, create a new user with default fridge item
            let newUser = {
              fridgeItems: [example_item]
            };
            localStorage.setItem('user', JSON.stringify(newUser));
            setFridgeItems(newUser.fridgeItems);
          }
    };

    const updateLocalStorage = async (updatedFridgeItems) => {
        console.log(updatedFridgeItems)
        const user = JSON.parse(localStorage.getItem('user'));
        user.fridgeItems = updatedFridgeItems;
        localStorage.setItem('user', JSON.stringify(user));
        const currentUserId = user.userId;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/editFridgeItems/${currentUserId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({updatedFridgeItems})
        })
      };

    const handleDeleteItem = () => {
        setFridgeItems(fridgeItems.filter(item => item !== clickedItem));
        setClickedItem(null);
        // setIsEditingItem(false);
        updateLocalStorage(fridgeItems);
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
        
        
        updateLocalStorage(fridgeItems);
    };

    useEffect(() => {
        fetchItems();
    }, []);
    
    const handleSaveNewItem = async () => {
        try {
            // Ensure that new item's fields are filled
            if (!newItem.name || !newItem.quantity || !newItem.purchasedDate || !newItem.expiration) {
                alert('Please fill in all fields');
                return;
            }
            setIsAddingItem(false);
            setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to add item. Please try again.');
        }
        setFridgeItems(prevItems => [...prevItems, newItem]);  // Update state directly
        setIsAddingItem(false);
        setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });
        const newFridgeItems = [...fridgeItems, newItem];
        updateLocalStorage(newFridgeItems);
      };

    const handleCancelAdd = () => {
        setIsAddingItem(false);
        setNewItem({ name: '', quantity: '', purchasedDate: '', expiration: '' });
    };

    const calculateDaysUntilExpiration = (expirationDate) => {
        const today = new Date();
        const expDate = new Date(expirationDate);
        const timeDiff = expDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      };

    return (
        <section className='fridge-page'>
            <div className='fridge-header'>
                {user && profile && (
                    <h1 className="username-wrapper">{profile.username}'s Fridge</h1>
                )}
                {!user && (
                    <h1 className="username-wrapper">Default Fridge</h1>
                )}
            </div>
            {/*}<div className="background"></div>{*/}
            <div className="fridge-grid">
                {fridgeItems.map((item, index) => {
                    const daysUntilExpiration = calculateDaysUntilExpiration(item.expiration);
                    const isExpiringSoon = daysUntilExpiration < 3;

                    return (
                    <div key={index} className="fridge-item" onClick={() => handleItemClick(item)}>
                        <p className='item-name'>{item.name}</p>
                        <p className='expiration-date' style={{ color: isExpiringSoon ? '#CC564D' : 'inherit' }}>
                        Expires in: {daysUntilExpiration} days
                        </p>
                    </div>
                    );
                })}
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
            {clickedItem && (
                <div className="backdrop" onClick={handleCloseDetails}>
                    <div className="view-item-details" onClick={handleModalClick}>
                        <p className='item-info'>Name: {clickedItem.name}</p>
                        <p className='item-info'>Quantity: {clickedItem.quantity}</p>
                        <p className='item-info'>Purchase Date: {clickedItem.purchasedDate}</p>
                        <p className='item-info'>Expiration Date: {clickedItem.expiration}</p>
                        <section className='edit-delete'>
                        {/*}
                        <button className="button" onClick={handleEditItem}>Edit</button>
                        {*/}
                            <button className="button" onClick={handleDeleteItem}>Delete</button>
                            <button className="button" onClick={handleCloseDetails}>Done</button>
                        </section>
                    </div>
                </div>
            )}
            <button className="add-button" onClick={handleAddItem}>+</button>
            {isAddingItem && (
                <div className="backdrop" onClick={handleCloseAdd}>
                    <div className="add-item-modal">
                        <div className='item-info'>
                            <section className='name-quantity'>
                                <label className='text-wrapper'>Name: </label>
                                <input
                                    className='input-box'
                                    type="text"
                                    placeholder="Name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </section>
                            
                            <section className='name-quantity'>
                                <label className='text-wrapper'>Quantity: </label>
                                <input
                                    className='input-box'
                                    type="text"
                                    placeholder="Quantity"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                />
                            </section>
                        
                            {/*}
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
                            {*/}
                            <section className='date'>
                                <label className='text-wrapper'> Purchase Date:</label>
                                <input 
                                    className='date-input'
                                    type="date" 
                                    value={newItem.purchasedDate}
                                    onChange={(e) => setNewItem({ ...newItem, purchasedDate: e.target.value })}
                                />
                            </section>
                            <section className='date'>
                                <label className='text-wrapper'> Expiration Date:</label>
                                <input 
                                    className='date-input'
                                    type="date" 
                                    value={newItem.expiration}
                                    onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })}
                                />
                            </section>
                        </div>
                        <div className='save-cancel'>
                            <button className='button' onClick={handleSaveNewItem}>Save</button>
                            <button className='button' onClick={handleCancelAdd}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}


export default MyFridge;
