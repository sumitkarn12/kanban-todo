import { useContext, useState } from "react";
import Item from "./Item";
import KanbanContext from "./KanbanContext";

function DropZone(props) {

	const itemContext = useContext(KanbanContext);
	const [active, setActive] = useState( false );

	const addItem = (ev) => {
		ev.preventDefault();
		let id = crypto.randomUUID();
		itemContext.setItems([...itemContext.items, {
			id: id,
			content: "",
			status: props.name
		}]);
	}

	const dragEnter = () => setActive( true );
	const dragOver = ( ev ) => ev.preventDefault();
	const dragLeave = () =>  setActive( false );
	const drop = () => {
		setActive( false );
		let item = itemContext.items.filter( i => i.id === itemContext.draggedItem )[0];
		item.status = props.name;
		itemContext.setItems([...itemContext.items]);
	}

	return (
		<div onDrop={drop} onDragEnter={dragEnter} onDragOver={dragOver} onDragLeave={dragLeave} className={(active)?"w3-teal kanban__dropzone":"kanban__dropzone"} data-name={props.name}>
			<h1 className="w3-xlarge w3-teal w3-center w3-padding">{props.name}</h1>
			<div className="kanban__dropzone_area">
			{
				itemContext.items.filter(i => i.status === props.name).map(i => <Item key={i.id} item={i} />)
			}
			</div>
			{
				props.name === "Not Started" &&  <div className="kanban__dropzon_addbutton">
					<button onClick={addItem} className="w3-button w3-white w3-round w3-block w3-border"><i className="fa-solid fa-plus"></i> Add Task</button>
				</div>
			}
		</div>
	)
}

export default DropZone;
