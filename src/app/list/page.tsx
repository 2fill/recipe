export default function List() { 
    let 상품 = ['Tomatoes', 'Pasta', 'Coconut'] // arr

    return (
    <div>
        <h4 className = "title">상품 목록</h4>
        {
            상품.map((a, i)=>{
                return(
                    <div className = "food" key = {i}>
                        <img src = {`/${i + 1}.jpg`} className = "food-img" />
                        <h4>{a} $40</h4>
                    </div>
                )   
            })
        }
    </div>
    )
}