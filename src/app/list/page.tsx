'use client';

import {useEffect, useState} from "react";

interface Category{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const List: React.FC = () => {
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
                categories.map((categories) => (
                    <div className = "category" key = {categories.idCategory}>
                        <img src = {categories.strCategoryThumb} alt = {categories.strCategory} className = "category-img" />
                        <h4 className = "category-name">{categories.strCategory}</h4>
                    </div>
                ))
            ) : (
                <p> 로딩 중 </p>
            )}
        </div>
    );
};

export default List;
// export default function List() { 
//     let 카테고리 = ['한식', '중식', '일식', '양식'] // arr

//     return (
//     <div className = "page">
//         <h4 className = "category-title">카테고리</h4>
//         {
//             카테고리.map((a, i)=>{
//                 return(
//                     <div className = "category" key = {i}>
//                         <img src = {`/${i + 1}.jpg`} className = "category-img" />
//                         <h4 className = "category-name">{a}</h4>
//                     </div>
//                 )   
//             })
//         }
//     </div>
//     )
// }