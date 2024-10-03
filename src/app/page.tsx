import Link from "next/link";

interface Category{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const fetchCategory = async (): Promise <Category[]> => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    return data.categories;
};

const Home = async() => {
    const categories: Category[] = await fetchCategory();
    
    return(
        <div className = "page">
            <h4 className = "category-title">Category</h4>
            {categories.length > 0 ? (
                categories.map((category) => (
                <Link href = {`/menu?name=${encodeURIComponent(category.strCategory)}`} key = {category.idCategory}>
                    <div className = "category">
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