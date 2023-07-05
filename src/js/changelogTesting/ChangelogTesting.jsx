import { useState } from "react";
import FileUpload from "../components/FileUpload";
import FileSave from "../components/FileSave";
import { formatChangelog, parseChangelog } from "./util";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const ChangelogTesting = () => {
  const [changelog, setChangelog] = useState(null);
  const [formattedChangelog, setFormattedChangelog] = useState(null);
  const [projectManagerBaseUrl, setProjectManagerBaseUrl] = useState("");
  const [showRaw, setShowRaw] = useState(false);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      setChangelog(e.target.result);
    };
  };

  const handleParseChangelog = () => {
    const changelogArray = parseChangelog(changelog);
    const formattedChangelog = formatChangelog({
      changelogArray,
      projectManagerBaseUrl,
    });
    setFormattedChangelog(formattedChangelog);
  };

  return (
    <div className="row">
      <div className="col-6">
        <FileUpload handleFileUpload={handleFileUpload} />
        Or paste your changelog here:
        <textarea
          className="form-control"
          rows="10"
          value={changelog || ""}
          onChange={(e) => setChangelog(e.target.value)}
        />
      </div>
      <div className="col-6">
        <div className="mb-3">
          <label htmlFor="basic-url" className="form-label">
            Your project manager base URL
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="example-ticket-number"
              value={projectManagerBaseUrl}
              onChange={(e) => setProjectManagerBaseUrl(e.target.value)}
              placeholder="https://project-manager.example.com/ticket/"
            />
            <span className="input-group-text" id="example-ticket-number">
              AB-123
            </span>
          </div>
          <div className="form-text" id="basic-addon4">
            This is used to generate links to tickets in the changelog.
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleParseChangelog}>
          Parse
        </button>
        {formattedChangelog && (
          <div>
            {showRaw && (
              <div className="card">
                <pre>{formattedChangelog}</pre>
              </div>
            )}
            {!showRaw && (
              <div className="card">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {formattedChangelog}
                </ReactMarkdown>
              </div>
            )}
            <div className="d-flex">
              <FileSave markdown={formattedChangelog} />
              <button
                className="btn btn-primary"
                onClick={() => setShowRaw(!showRaw)}
              >
                {showRaw ? "Show preview" : "Show raw"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangelogTesting;
