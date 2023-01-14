import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback } from 'react';
import { ACTION_CONSTRUCTOR_REMOVE, ACTION_CONSTRUCTOR_MOVE } from '../../../services/actions/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { TCartIngredient, TDragCartIngredient } from '../../../utils/types';
import { useAppDispatch } from '../../../services/types/hooks';

interface IBurgerConstructorItemProps extends TCartIngredient {}
 
const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = (item: IBurgerConstructorItemProps) => {

    const dispatch = useAppDispatch();

    const [{ isDrag }, drag] = useDrag<TDragCartIngredient, unknown, {isDrag: boolean}>({
        type: "cart",
        item: { id: item.id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{ isHover }, drop] = useDrop<TDragCartIngredient, unknown, {isHover: boolean}>({
        accept: "cart",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(element: TDragCartIngredient) {
            dispatch({
                type: ACTION_CONSTRUCTOR_MOVE,
                src: item.id,
                dest: element.id,
            });
        },
    });

    const onRemoveItem = useCallback((id: number): void => {
        dispatch({ type: ACTION_CONSTRUCTOR_REMOVE, id: id });
    }, [dispatch]);

    return (
        <div ref={drop}>
            <div className={styles.main_items_item}
                draggable ref={drag}
                style={{ opacity: isDrag ? 0.5 : 1 }}>
                <span className={styles.main_items_item_icon}>
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    text={item.name}
                    thumbnail={item.image_mobile}
                    price={item.price}
                    handleClose={() => { onRemoveItem(item.id) }}
                    extraClass={isHover ? styles.hover : ''}
                />
            </div>
        </div>
    );
}

export { BurgerConstructorItem };
