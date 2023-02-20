import { useEffect } from 'react';
import '../styles/styles.css'

const Card = ({ card, isActive }) => {
    const cardClassName = isActive ? 'card active' : 'card';

    return (
        <div className={`${cardClassName}`}>
            <img className='card-image' src={card.imageUrl}></img>
        </div>
    );
}
 
export default Card;