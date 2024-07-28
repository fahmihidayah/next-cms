'use client'
import React, { FormEvent, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import MediumEditor from 'medium-editor';
import { on } from "events";


type Props = HTMLAttributes<HTMLInputElement> & {
    value?: string;
    name: string;
    onChange: (e: { target: { value: string, name: string } }) => void;
    disabled?: boolean;
    required?: boolean;
};

const EditorForm = ({ value, name, onChange, disabled, required }: Props) : JSX.Element => {

    const editorRef = useRef(null);

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        if (!editorRef.current) return;
        const editor = new MediumEditor(editorRef.current, {

            toolbar: {
                buttons: ['bold',
                    'italic', 'underline', 'anchor',
                    {
                        name: 'h1',
                        action: 'append-h2',
                        aria: 'header type 1',
                        tagNames: ['h2'],
                        contentDefault: '<b>H1</b>',
                        classList: ['text-lg'],
                        attrs: {
                            'data-custom-attr': 'attr-value-h1'
                        }
                    },
                    {
                        name: 'h2',
                        action: 'append-h3',
                        aria: 'header type 2',
                        tagNames: ['h3'],
                        contentDefault: '<b>H2</b>',
                        classList: ['text-2xl'],
                        attrs: {
                            'data-custom-attr': 'attr-value-h2',
                            'className' : 'text-2xl'
                        }
                    }

                    , 'quote', 'pre', 'unorderedlist', 'orderedlist', 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'removeFormat']
            }
        });
        // // Clean up
        editor.subscribe('editableInput', function (event, editable) {
            onChange(
                {
                    target: {
                        value: `${editable.innerHTML}`,
                        name: name,
                    }
                }
            );
            // setLocalValue(editable.innerHTML);
        });
        // `${editable.innerHTML}
        editor.setContent(localValue ?? "");
        return () => {
            
            editor.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col gap-3">
            
            <div className="h-screen px-2 py-2" ref={editorRef}>
               
            </div>
        </div>
    );
}

export default EditorForm;