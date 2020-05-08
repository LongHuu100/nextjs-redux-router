import { useState } from 'react'
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorClient = (props) => {
    const [content, setContent] = useState(props.content);
    return (
        <CKEditor
            data={content}
            onInit={editor =>
                console.log("Editor is ready to use!", editor)
            }
            onChange={(event, editor) => {
                setContent(editor.getData());
            }}
            onBlur={(event, editor) => {
                props.setContent(content);
            }}
            editor={ClassicEditor}
        />
    );
}

export default EditorClient;
