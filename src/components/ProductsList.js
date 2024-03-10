import React, { useEffect, useState } from 'react';
import { Grid } from 'react-virtualized';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

function ProductsList({ products }) {
    const [items, setItems] = useState(products);
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor)
    );
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            products.forEach((newProduct) => {
                const existingProductIndex = updatedItems.findIndex(
                    (item) => item.id === newProduct.id
                );
                if (existingProductIndex === -1) {
                    updatedItems.push(newProduct);
                } else {
                    updatedItems[existingProductIndex] = newProduct;
                }
            });
            return updatedItems;
        });
    }, [products]);

    useEffect(() => {
        console.log('Updated item length', items.length);
    }, [items]);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            if (selectedItems.length) {
                const newItems = [...items];
                const oldIndex = newItems.findIndex((item) => item.id === active.id);
                const newIndex = newItems.findIndex((item) => item.id === over.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    selectedItems.forEach((selectedItemId) => {
                        const selectedIndex = newItems.findIndex(
                            (item) => item.id === selectedItemId
                        );
                        if (selectedIndex !== -1) {
                            const [removed] = newItems.splice(selectedIndex, 1);
                            newItems.splice(newIndex, 0, removed);
                        }
                    });
                    setItems(newItems);
                }
                setSelectedItems([]);
            } else {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    const updatedItems = arrayMove(items, oldIndex, newIndex);
                    setItems(updatedItems);
                }
            }
        }
        setActiveId(null);
        setIsDragging(false);
    }

    function handleItemClick(itemId) {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId]
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => {
                setActiveId(event.active.id);
                setIsDragging(true);
            }}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={rectSortingStrategy}
            >
                <Grid
                    cellRenderer={({ rowIndex, columnIndex, key, style }) => {
                        const itemIndex = rowIndex * 6 + columnIndex;
                        const item = items[itemIndex];
                        if (item) {
                            return (
                                <SortableItem
                                    key={key}
                                    id={item.id}
                                    style={style}
                                    index={itemIndex}
                                    isActive={activeId === item.id}
                                    isDragging={isDragging}
                                    featuredImage={item.image} // Updated to use 'image' from product JSON
                                    title={item.name} // Updated to use 'name' from product JSON
                                    vendor={item.actor} // Updated to use 'actor' from product JSON
                                    isSelected={selectedItems.includes(item.id)}
                                    onClick={() => handleItemClick(item.id)}
                                />
                            );
                        }
                        return null;
                    }}
                    columnCount={6}
                    columnWidth={250}
                    rowHeight={310}
                    rowCount={Math.ceil(items.length / 6)}
                    width={1850}
                    height={800}
                    style={{height: '70vh',marginRight: '20px'}}
                />
            </SortableContext>

            <DragOverlay>
                {activeId ? (
                    <SortableItem
                        id={activeId}
                        content={items.find((item) => item.id === activeId).name} // Updated to use 'name' from product JSON
                        featuredImage={items.find((item) => item.id === activeId).image} // Updated to use 'image' from product JSON
                        title={items.find((item) => item.id === activeId).name} // Updated to use 'name' from product JSON
                        vendor={items.find((item) => item.id === activeId).actor} // Updated to use 'actor' from product JSON
                        isActive
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default ProductsList;
