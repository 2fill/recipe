import {age, name} from './data.tsx'

export default function Cart(){
    return(
        <div>
            <h4 className = "title">cart</h4>
            <CartItem />
            <CartItem />
            <CartItem />
        </div>
    )
}

function CartItem(){
    return(
        <div className = "cart-item">
            <p>상품명 {name}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
}