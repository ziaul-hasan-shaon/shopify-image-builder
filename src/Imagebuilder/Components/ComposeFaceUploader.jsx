import React, { useState } from "react";

function ComposeFaceUploader() {
  const [templateFile, setTemplateFile] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("template", templateFile);
		formData.append("source", sourceFile);
	
		const response = await fetch("http://localhost:9000/compose", {
			method: "POST",
			body: formData,
		});
	
		if (response.ok) {
			const blob = await response.blob();
			console.log(blob)
			console.log(blob.type)
			// Check the content type
			const contentType = response.headers.get("Content-Type");
	
			if (contentType && contentType.startsWith("image/")) {
				setResultUrl(URL.createObjectURL(blob));
			} else {
				const errorMessage = await response.text();
				console.error("Error from server:", errorMessage);
				// Handle error here if needed
			}
		} else {
			console.error("Failed to fetch the image:", response.statusText);
		}
	};	

	console.log('result', resultUrl)

  return (
    <div>
      <input type="file" onChange={(e) => setTemplateFile(e.target.files[0])} />
      <input type="file" onChange={(e) => setSourceFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Upload & Compose</button>

      {resultUrl && (
        <div>
          <h3>Composited Image:</h3>
          <img src={resultUrl} alt="Result" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default ComposeFaceUploader;
