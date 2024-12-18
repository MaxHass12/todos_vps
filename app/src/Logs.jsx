import { useState } from 'react';

function Logs({ handleShowNotes, logs }) {
  return (
    <div>
      <h1>
        Logs <button onClick={handleShowNotes}>Show Notes</button>
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Request</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            return (
              <tr key={log.id}>
                <td>{log.request}</td>
                <td>{log.response}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;
