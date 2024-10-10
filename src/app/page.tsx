/* Next.js 라우팅 */
import Link from "next/link";

interface Category{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

/* 카테고리 데이터 가져오는 비동기 함수, Category 배열 반환 */
const fetchCategory = async(): Promise <Category[]> => {
    /* API 요청 */
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    /* API 응답 json 형식으로 변환 */
    const data = await response.json();
    /* 'categories' 속성 반환 */
    return data.categories;
};

const Home = async() => {
    /* fetchCategory 함수로 데이터 가져옴 */
    const categories: Category[] = await fetchCategory();
    
    return(
        <div className = "page">
            <h4 className = "category-title">Category</h4>
            {categories.length > 0 ? (
                // categories 배열을 순회
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