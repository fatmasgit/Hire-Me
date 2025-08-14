import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const JobRequirements = ({ value, onChange, name }) => {
  const [editorContent, setEditorContent] = useState(value || "");

  const handleEditorChange = (content) => {
    setEditorContent(content);
    onChange(name, content);
  };

  return (
    <div className="editor-container relative z-10 w-full">
      <Editor
        apiKey="12ptgydfqn50t9kil75blnlyprkr7xygygt3kj927y7dkhvb"
        value={editorContent}
        onEditorChange={handleEditorChange}
        init={{
          menubar: false,
          skin: "bootstrap",
          content_css: "default",
          plugins: [
            "lists",
            "link",
            "charmap",
            "advlist",
          ],
          toolbar: "blocks | bold italic bullist numlist | link  charmap",
          branding: false,
        }}
      />
    </div>
  );
};

export default JobRequirements;
