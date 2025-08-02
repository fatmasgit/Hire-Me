import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const JobDescription = ({ value, onChange, name }) => {
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
          height: 180,
          menubar: false,
          skin: "bootstrap",      // ✅ Keep this for Bootstrap UI look
          content_css: "default", // ✅ Use default content styles
          plugins: [
            "lists",       // bullet/numbered list
            "link",        // hyperlink
            "charmap",     // special characters
            "advlist",     // enhanced lists
          ],
          toolbar: "blocks | bold italic bullist numlist | link  charmap",
          branding: false,
        }}
      />
    </div>
  );
};

export default JobDescription;
