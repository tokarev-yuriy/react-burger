import React, { ReactElement, Ref, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

interface TInputInterface extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
    value: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    success?: boolean;
    error?: boolean;
    disabled?: boolean;
    icon?: keyof TICons;
    errorText?: string;
    size?: 'default' | 'small';
    extraClass?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

function EditableInput(props: TInputInterface): ReactElement {

    const ref = useRef<Ref<HTMLInputElement>>();
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const toggleEditableField = (): void => {
        setIsEditable(!isEditable);
        if (ref.current instanceof HTMLInputElement) {
            ref.current.focus();
        }
    };

    return (
        <Input
            {...props}
            readOnly={!isEditable}
            icon={!isEditable ? 'EditIcon' : 'CloseIcon'}
            onIconClick={e => toggleEditableField()}
            ref={ref as Ref<HTMLInputElement>}
        />
    );
}

export { EditableInput };
