import { useState, useEffect } from "react";
import DropZone from "./DropZone";
import KanbanContext from "./KanbanContext";

const App = () => {

	let storedItems = JSON.parse( localStorage.getItem("kanban-items") );

	const [items, setItems] = useState(storedItems);
	const [draggedItem, setDraggedItem] = useState(null);

	useEffect(() => {
        let intv = setInterval(() => {
            localStorage.setItem( "kanban-items", JSON.stringify( items ) );
        }, 500);
        return () => clearInterval( intv );
    }, [items]);

	return (
		<KanbanContext.Provider value={{ items, setItems, draggedItem, setDraggedItem }}>
			<div className="kanban overflow-hidden">
				<DropZone name="Not Started" />
				<DropZone name="In Progress" />
				<DropZone name="Completed" />
			</div>
		</KanbanContext.Provider>
	)
}

export default App
