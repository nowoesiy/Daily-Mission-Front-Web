import React from 'react';
import './index.scss';

import Editor from 'tui-editor';
import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';

let toastEditor;
class EditorComponent extends React.Component {
  state = {
    content: '',
  };
  editorRef = React.createRef();
  postBoard = () => {
    console.log(toastEditor.getHtml());
  };

  componentDidMount() {
    toastEditor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg', // 'markdown'
      previewStyle: 'vertical',
      height: '900px',
      exts: ['colorSyntax'],
    });
  }
  render() {
    return (
      <>
        <div id="editSection" style={{ padding: '200px' }}></div>
        <button onClick={this.postBoard}>글 쓰기</button>
      </>
    );
  }
}

export default EditorComponent;
