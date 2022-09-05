/* eslint-disable no-unused-vars */
import {
  FaBold as BoldIcon,
  FaItalic as ItalicIcon,
  FaStrikethrough as StrikeIcon,
  // FaCode as CodeIcon,
  // FaParagraph as ParagraphIcon,
  // FaListUl as BulletListIcon,
  // FaListOl as OrderedListIcon,
  // FaQuoteLeft as BlockquoteIcon,
  FaUndo as UndoIcon,
  FaRedo as RedoIcon,
} from 'react-icons/fa';
// import {
//   RiH1 as H1Icon,
//   RiH2 as H2Icon,
//   RiH3 as H3Icon,
//   RiH4 as H4Icon,
//   RiH5 as H5Icon,
//   RiH6 as H6Icon,
// } from 'react-icons/ri';
import TiptapMenuBtn from '../../components/Interactive/TiptapMenuBtn';

function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap flex-row justify-start items-center border-b-2 border-slate-400 dark:border-slate-600">
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <BoldIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <ItalicIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikeIcon size={18} />
      </TiptapMenuBtn>
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <CodeIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <H1Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <H2Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <H3Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <H4Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <H5Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <H6Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <BulletListIcon size={18} />
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <OrderedListIcon size={18} />
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <CodeIcon size={18} />
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <BlockquoteIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </TiptapMenuBtn> */}
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon size={18} />
      </TiptapMenuBtn>
    </div>
  );
}

export default MenuBar;
