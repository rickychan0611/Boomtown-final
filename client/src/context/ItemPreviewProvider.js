import React, { useState, createContext, useContext} from 'react'
import {ViewerContext} from './ViewerProvider';

export const ItemPreviewContext = createContext();


const initialState = {
    title: 'Enter item name',
    description: 'Describe your item',
    tags: [],
    imageUrl: 'https://www.7pace.com/wp-content/uploads/2019/08/cover-abstract-thinking.png',
    itemowner: "2",
    created: new Date()
}

const ItemPreviewProvider = ({children}) => {
    const [item, setItem] = useState(initialState)
    
    const updatePreview = (name, value) => {
        const updatedItem = {...item, [name]: value}
        // updatedItem.itemowner = viewer.user.id
        // console.log('updatedItem' + JSON.stringify(updatedItem))
        setItem(updatedItem)
    }
    const updateTags = (name, value) => {
        console.log('hello ' + name +' ' + value) 
    }

    const resetPreview = () => {
        setItem(initialState)
    }

        return (
            <ItemPreviewContext.Provider 
                value={{
                    state: item, 
                    updatePreview: updatePreview,
                    resetPreview: resetPreview
                    }}>
                {children}
            </ItemPreviewContext.Provider>
        )
    }


export default ItemPreviewProvider