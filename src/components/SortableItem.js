import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({
                                 id,
                                 style,
                                 isDragging,
                                 isActive,
                                 featuredImage,
                                 title,
                                 vendor,
                                 isSelected,
                                 onClick,
                             }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const defaultImageUrl =
        'https://www.hulkapps.com/cdn/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif';

    const containerStyle = {
        ...style,
        transform: isDragging ? CSS.Transform.toString(transform) : null,
        transition: isDragging ? transition : undefined,
        userSelect: 'none',
        background: 'white',
        marginBottom: '4px',
    };

    const gridItemStyle = {
        border: isSelected ? '2px solid red' : isActive ? '2px solid #28509A' : '1px solid #ccc',
        background: isActive ? '#F5F9FF' : 'none',
        textAlign: 'center',
        position: 'relative',
        padding: '5px',
    };

    return (
        <div
            ref={setNodeRef}
            style={containerStyle}
            {...attributes}
            {...listeners}
            className="grid-item-wrapper"
            onClick={onClick}
        >
            <div>
                <div style={{ position: 'relative', padding: '5px' }}>
                    <div className="grid-item" style={gridItemStyle}>
                        <div className="image-wrapper" style={{position: 'relative', paddingBottom: '100%'}}>
                            <img
                                src={featuredImage ? featuredImage : defaultImageUrl}
                                alt={title}
                                style={{position: 'absolute', height: '100%',right: '0',top: '0',left: '0', width: '100%'}}
                            />
                        </div>
                        <h3 style={{ margin: '5px' }}>{title}</h3>
                        <p style={{ margin: '5px' }}>{vendor}</p>
                        {/* Additional product details can be added as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}
