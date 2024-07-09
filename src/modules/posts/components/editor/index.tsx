'use client'
import { useEffect, useRef } from "react";
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import MediumEditor from 'medium-editor';

export default function EditorForm() {

    const titleRef = useRef(null);

    const editorRef = useRef(null);

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

        if (!titleRef.current) return;
        const titleEditor = new MediumEditor(titleRef.current,);

        // Clean up
        return () => {
            titleEditor.destroy();
            editor.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col gap-3 py-5 px-5">
            <div className="text-2xl font-bold px-2 py-2 focus:border-white" ref={titleRef}>
                
            </div>
            <div className="h-96 px-2 py-2" ref={editorRef}>

            </div>
        </div>
    );
}