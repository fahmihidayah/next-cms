'use client'
import { ReactNode, useEffect, useRef, useState } from "react";
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import MediumEditor from 'medium-editor';
import { CustomInputProps } from "@premieroctet/next-admin";


type Props = CustomInputProps;

const EditorForm = ({ value, name, onChange, disabled, required }: Props) : JSX.Element => {

    const editorRef = useRef(null);
    const [localValue, setLocalValue]  = useState<string | undefined>(value);

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
            setLocalValue(editable.innerHTML);
        });
        editor.setContent(localValue ?? "");
        // `${editable.innerHTML}
        return () => {
            
            editor.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col gap-3">
            
            <div className="h-96 px-2 py-2" ref={editorRef}>
                {value}
            </div>
            <input type="hidden" name={name} value={localValue} onChange={onChange}/>
        </div>
    );
}

export default EditorForm;