import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
    <EditorContent editor={editor} />
  );
}

export default TextEditor;
