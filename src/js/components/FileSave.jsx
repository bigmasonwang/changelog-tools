const FileSave = ({ markdown }) => {
  const saveFile = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "output.md";
    link.click();

    // Release the reference to the file by revoking the Object URL
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={saveFile}>
        Save as .md
      </button>
    </div>
  );
};

export default FileSave;
