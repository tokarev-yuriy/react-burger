import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';


function EditableInput(props) {

    const ref = useRef();
    const [isEditable, setIsEditable] = useState(false);

    const toggleEditableField = () => {
        setIsEditable(!isEditable);
        ref.current.focus();
    };

    return (
        <Input
            {...props}
            readOnly={!isEditable}
            icon={!isEditable ? 'EditIcon' : 'CloseIcon'}
            onIconClick={e => toggleEditableField()}
            ref={ref}
        />
    );
}

export { EditableInput };
