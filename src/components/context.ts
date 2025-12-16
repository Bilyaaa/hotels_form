
import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "../components/models"

export interface ContexInterface {
    isDropdownVisible: boolean,
    setIsDropdownVisible: Dispatch<SetStateAction<boolean>>,
    searchResults: Item[],
    setSearchResults: Dispatch<SetStateAction<Item[]>>
    searchTarget: Item | null,
    setSearchTarget: Dispatch<SetStateAction<Item | null>>
}

export const FormContext = createContext<ContexInterface>({
    isDropdownVisible: false,
    setIsDropdownVisible: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    searchResults: [],
    setSearchResults: function (value: SetStateAction<Item[]>): void {
        throw new Error("Function not implemented.");
    },
    searchTarget: null,
    setSearchTarget: function (value: SetStateAction<Item | null>): void {
        throw new Error("Function not implemented.");
    }
})



