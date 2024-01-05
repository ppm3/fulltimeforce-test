import React, { useState, useEffect } from 'react';
import './App.css';

function getGitCommitEndpoints(): string {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  return `${apiUrl}/${apiEndpoint}`;
}



function CommitsTable() {
  const [commits, setCommits] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${getGitCommitEndpoints()}?per_page=10&page=1`)
      .then(response => response.json())
      .then(data => setCommits(data))
      .catch(error => setError('Error fetching data. Please wait or refresh the page.'));
  }, []);

  if (error) { // Render error message if error state is not null
    return <div id="errorMessage">{error}</div>;
  }

  if (commits.length === 0) {
    return <div id="loadingLabel">Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Email</th>
          <th>Date</th>
          <th>Message</th>
          <th>Commit URL</th>
        </tr>
      </thead>
      <tbody>
        {commits.map((item, index) => (
          <tr key={index}>
            <td>{item.commit.author.name}</td>
            <td>{item.commit.author.email}</td>
            <td>{item.commit.author.date}</td>
            <td>{item.commit.message}</td>
            <td><a href={item.url}>Commit Link</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {

  React.useEffect(() => {
    document.title = "TFT - Git Commits";
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <CommitsTable />
      </header>
    </div>
  );
}

export default App;
