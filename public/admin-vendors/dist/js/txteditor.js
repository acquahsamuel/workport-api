tinymce.init({
  // selector: 'textarea#jobDescription',
  selector: "textarea",
  height: 300,
  menubar: false,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar: "undo redo | formatselect | " + "bold | alignleft " + " bullist ",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
});
