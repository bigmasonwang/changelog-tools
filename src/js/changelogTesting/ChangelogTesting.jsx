import { useState } from "react";
import FileUpload from "../components/FileUpload";
import FileSave from "../components/FileSave";
import { formatChangelog, parseChangelog } from "./util";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const ChangelogTesting = () => {
  const [changelog, setChangelog] = useState(null);
  const [formattedChangelog, setFormattedChangelog] = useState(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      setChangelog(e.target.result);
    };
  };

  const handleParseChangelog = () => {
    const changelogArray = parseChangelog(changelog);
    const formattedChangelog = formatChangelog(changelogArray);
    setFormattedChangelog(formattedChangelog);
  };

  return (
    <div className="row">
      <div className="col-6">
        <FileUpload handleFileUpload={handleFileUpload} />
        {changelog && (
          <div className="card">
            <pre>{changelog}</pre>
          </div>
        )}
      </div>
      <div className="col-6">
        <button className="btn btn-primary" onClick={handleParseChangelog}>
          Parse
        </button>
        {formattedChangelog && (
          <div>
            <div className="card">
              <pre>{formattedChangelog}</pre>
            </div>
            <FileSave markdown={formattedChangelog} />
            <div className="card">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {formattedChangelog}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangelogTesting;
