'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

interface MenuItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const Menu: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchMenuItems = async () => {
            if (name) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
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
    }, [name]);

    const alphabet = [...Array(26)].map((_, index) => String.fromCharCode(65 + index));

    const filteredMenuItems = filter === 'all'
        ? menuItems
        : menuItems.filter(item => item.strMeal.charAt(0).toLowerCase() === filter);

    return (
        <div>
            <h1 className = "menu-title">{name}</h1>
            <nav className = "menu-nav">
                <button onClick={() => setFilter('all')}>All</button>
                {alphabet.map(letter => {
                    const startingLetter = menuItems.filter(item => item.strMeal.charAt(0).toLowerCase() === letter.toLowerCase());
                    return startingLetter.length > 0 ? (
                        <button key = {letter} onClick = {() => setFilter(letter.toLowerCase())}>
                            {letter}
                        </button>
                    ) : null;
                })}
            </nav>
            {loading ? (
                <p className = "loading">Loading... ⏲️</p>
            ) : menuItems.length > 0 ? (
                <div className = "menu">
                    {filteredMenuItems.map((item) => (
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