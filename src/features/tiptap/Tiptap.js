/* eslint-disable no-unused-vars */
import { useEditor, EditorContent } from '@tiptap/react';
// import { EditorView } from 'prosemirror-view';
import StarterKit from '@tiptap/starter-kit';
import './Tiptap.scss';
import MenuBar from './MenuBar';

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

function Tiptap({
  content, label, setContent, tabIndex
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-2 focus:outline-none',
        style: 'height: 120px;'
      },
    },
    content: content || '',
    onUpdate: ({ editor: e }) => {
      // console.log(e.getText());
      // console.log(e.getHTML(), transaction);
      if (setContent) setContent(e.getHTML());
    },
    // onBeforeCreate: ({ editor: e }) => {
    //   console.log(e.getJSON(), 'before create event');
    // },
    // onCreate: ({ editor: e }) => {
    //   // console.log('create event');
    //   // e.setOptions({ content: content || '' });
    // },
    // onSelectionUpdate: () => {
    //   // console.log('selection update event');
    // },
    // onTransaction: ({ editor: e, transaction: t }) => {
    //   // console.log('transaction event');
    // },
  });

  // console.log(editor);

  return (
    <>
      {label && (
      <div className="text-lg py-2 font-bold">
        {label}
      </div>
      )}
      <div
        className="border-2 font-bold border-slate-400 dark:border-slate-600 w-full"
      >
        <MenuBar editor={editor} />
        <EditorContent
          tabIndex={tabIndex}
          editor={editor}
          style={{
            height: '120px'
          }}
        />
      </div>
    </>
  );
}

export default Tiptap;
