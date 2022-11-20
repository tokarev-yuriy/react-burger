import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_CONSTRUCTOR_REMOVE } from '../../services/actions/constructor';
import { useDrag } from 'react-dnd';

function BurgerConstructorItem(item) {

    const dispatch = useDispatch();

    const [{ isDrag }, drag] = useDrag({
        type: "cart",
        item: { id: item.id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    
    const onRemoveItem = useCallback((id) => {
        dispatch({type: ACTION_CONSTRUCTOR_REMOVE, id: id});
    }, [dispatch]);

    return (
        <div className={styles.main_items_item} draggable ref={drag}>
            <span className={styles.main_items_item_icon}>
                <DragIcon />
            </span>
            <ConstructorElement
                text={item.name}
                thumbnail={item.image_mobile}
                price={item.price}
                handleClose={() => {onRemoveItem(item.id)}}
            />
        </div>
    );
}

export { BurgerConstructorItem };
