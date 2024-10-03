'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

interface MenuItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const Menu: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            if (id) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
                    const data = await response.json();
                    setMenuItems(data.meals || []);
                }
                catch (error) {
                    console.error("Failed to fetch menu items: ", error);
                }
                finally {
                    setLoading(false);
                }
            }
        };

        fetchMenuItems();
    }, [id]);

    return (
        <div>
            <h1>Menu for Category ID: {id}</h1>
            {loading ? (
                <p>Loading menu items...</p>
            ) : menuItems.length > 0 ? (
                <div className = "menu-items">
                    {menuItems.map((item) => (
                        <div className = "menu-item" key = {item.idMeal}>
                            <img src = {item.strMealThumb} alt={item.strMeal} className = "menu-item-img" />
                            <h2 className = "menu-item-name">{item.strMeal}</h2>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No menu items found for this category.</p>
            )}
        </div>
    );
};

export default Menu;