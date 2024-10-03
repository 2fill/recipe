export default function List() { 
    let 카테고리 = ['한식', '중식', '일식', '양식'] // arr

    return (
    <div className = "page">
        <h4 className = "category-title">카테고리</h4>
        {
            카테고리.map((a, i)=>{
                return(
                    <div className = "category" key = {i}>
                        <img src = {`/${i + 1}.jpg`} className = "category-img" />
                        <h4 className = "category-name">{a}</h4>
                    </div>
                )   
            })
        }
    </div>
    )
}