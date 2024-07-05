import { useContext, useEffect, useState } from "react";
import KanbanContext from "./KanbanContext";

const Item = (props) => {

    const itemContext = useContext(KanbanContext);
    const [content, setContent] = useState( props.item.content );

    const remove = (ev) => {
        ev.preventDefault();
        let items = itemContext.items.filter(i => i.id !== props.item.id);
        itemContext.setItems(items);
    }

    useEffect(() => {
        props.item.content = content.trim();
        itemContext.setItems( [...itemContext.items] );
    }, [content]);

    const change = (ev) =>  setContent( ev.currentTarget.value )
    const dragStart = ( ev ) => {
        itemContext.setDraggedItem( props.item.id );
    }
    const dragEnd = ( ev ) => {
        itemContext.setDraggedItem( null );
    }

    return (
        <div onDragEnd={dragEnd} onDragStart={dragStart} className="kanban__item space-between w3-orange w3-round-large overflow-hidden" draggable="true">
            <div className="kanban__item_handle w3-button"><i className="fa-solid fa-grip-vertical"></i></div>
            <input onChange={change} type="text" className="w3-input kanban__item_content" data-id={props.item.id} value={content} />
            {
                props.item.status === "Completed" && <button onClick={remove} className="kanban__item_remove w3-card w3-button w3-teal"><i className="fa-solid fa-remove"></i></button>
            }
        </div>
    )
}

export default Item;