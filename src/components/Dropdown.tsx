
import React, { useContext } from "react";
import { FormContext } from "../components/context";
import { Item } from "../components/models"


interface DropdownProps {
        itemsList : Item[]
    }

const Dropdown: React.FC<DropdownProps> = ({itemsList}) => {

    const context = useContext(FormContext)

    const handleItemSelect = (item: Item) => {
        console.log(item)
        context.setSearchTarget(item)
    }
 
    return (
        <ul>
            {itemsList.map((item) => (
                <li onClick={() => {handleItemSelect(item)}} key={item.id}>
                    {item.flag &&<img src={item.flag} alt="counry flag"/>}
                    {item.name}
                </li>
            ))}
        </ul>

    )
}

export default Dropdown