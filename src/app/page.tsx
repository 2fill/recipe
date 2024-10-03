'use client';

import {useEffect, useState} from "react";
import Link from "next/link";

interface Category{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const Home: React.FC = () => {
    const[categories, setCategories] = useState<Category[]>([]);

    useEffect(()=>{
        const fetchCategory = async () => {
            try{
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategories(data.categories);
            }
            catch(error){
                console.error("Failed to fetch category: ", error);
            }
        };
        fetchCategory();
    }, []);
    
    return(
        <div className = "page">
            <h4 className = "category-title">Category</h4>
            {categories.length > 0 ? (
                categories.map((category) => (
                  <Link href = {`/menu?name=${encodeURIComponent(category.strCategory)}`} key = {category.idCategory}>
                    <div className = "category" key = {category.idCategory}>
                        <img src = {category.strCategoryThumb} alt = {category.strCategory} className = "category-img" />
                        <h4 className = "category-name">{category.strCategory}</h4>
                    </div>
                  </Link>
                ))
            ) : (
                <p className = "loading"> Loading... ⏲️ </p>
            )}
        </div>
    );
};

export default Home;