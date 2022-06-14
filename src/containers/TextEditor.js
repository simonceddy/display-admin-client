import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContainer } from '../components/TextEditor';

function TextEditor({ content = '', onUpdate }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ ed }) => {
      if (onUpdate) onUpdate(ed.getHTML());
    }
  });

  return (
    <EditorContainer>
      <EditorContent editor={editor} />
    </EditorContainer>
  );
}

export default TextEditor;
