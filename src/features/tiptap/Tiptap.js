import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './Tiptap.scss';
import MenuBar from './MenuBar';

function Tiptap({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    content: content || '',
  });

  // console.log(editor);

  return (
    <>
      <div>
        {}
      </div>
      <div
        className="border-2 border-slate-400 dark:border-slate-600 w-11/12 h-5/6"
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

export default Tiptap;
