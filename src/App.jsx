import React, { useState } from 'react';
import {Heart} from "lucide-react";
import tweets from "./array.json";

const App = () => {
  const [sortedTweets, setSortedTweets] = useState(tweets);
  const [sortOrder, setSortOrder] = useState('newest');

  const parseValue = (value) => {
    if (typeof value !== 'string') return 0;
    return parseFloat(value.replace('k', '000').replace('M', '000000'));
  };

  const handleSort = (type) => {
    let newTweets = [...tweets];
    switch (type) {
      case 'likes':
        newTweets.sort((a, b) => parseValue(b.likes) - parseValue(a.likes));
        break;
      case 'retweets':
        newTweets.sort((a, b) => parseValue(b.retweets) - parseValue(a.retweets));
        break;
      case 'replies':
        newTweets.sort((a, b) => parseValue(b.replies) - parseValue(a.replies));
        break;
      case 'reverse':
        newTweets.reverse();
        break;
      default:
        newTweets = [...tweets];
    }
    setSortedTweets(newTweets);
    setSortOrder(type);
  };

  return (
    <div className="timeline-container">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .timeline-container {
          min-height: 100vh;
          background-color: black;
          color: white;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: fadeIn 0.5s ease-out;
        }
        .timeline-wrapper {
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
          animation: fadeIn 0.5s ease-out 0.2s backwards;
        }
        .header h1 {
          font-size: clamp(2rem, 8vw, 2.5rem);
          font-weight: 900;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #60A5FA, #A78BFA);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .header p {
          color: #9CA3AF;
          font-size: clamp(0.875rem, 3vw, 1rem);
        }
        .controls {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeIn 0.5s ease-out 0.4s backwards;
        }
        .control-btn {
          background-color: #16181C;
          border: 1px solid #2F3336;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: clamp(0.75rem, 2.5vw, 0.875rem);
          white-space: nowrap;
        }
        .control-btn:hover {
          background-color: #1D1F23;
          border-color: #3B82F6;
          transform: translateY(-2px);
        }
        .control-btn.active {
          background-color: #3B82F6;
          border-color: #3B82F6;
        }
        .tweets {
          display: flex;
          flex-direction: column;
        }
        .tweet {
          background-color: #16181C;
          border: 1px solid #2F3336;
          border-radius: 1rem;
          padding: 1rem;
          animation: slideIn 0.5s ease-out;
          transition: transform 0.2s;
        }
        .tweet:hover {
          transform: translateY(-2px);
        }
        .tweet-content {
          display: flex;
          gap: 1rem;
        }
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #2F3336;
          flex-shrink: 0;
        }
        .tweet-body {
          flex-grow: 1;
          min-width: 0;
        }
        .tweet-header {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .username {
          font-weight: bold;
          font-size: clamp(0.875rem, 3vw, 1rem);
        }
        .handle, .time {
          color: #6B7280;
          font-size: clamp(0.75rem, 2.5vw, 0.875rem);
        }
        .tweet-text {
          margin-bottom: 1rem;
          word-wrap: break-word;
          font-size: clamp(0.875rem, 3vw, 1rem);
        }
        .tweet-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6B7280;
          font-size: clamp(0.75rem, 2.5vw, 0.875rem);
        }
        .stat svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        @media (max-width: 480px) {
          .timeline-container {
            padding: 0.5rem;
          }
          .tweet {
            padding: 0.75rem;
          }
          .tweet-stats {
            gap: 0.75rem;
          }
          .controls {
            gap: 0.5rem;
          }
          .control-btn {
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>

      <div className="timeline-wrapper">
        <div className="header">
          <h1>YeTweets</h1>
          <p>February Archive</p>
        </div>
        <div className="controls">
          <button
            className={`control-btn ${sortOrder === 'newest' ? 'active' : ''}`}
            onClick={() => handleSort('newest')}
          >
            Oldest First
          </button>
          <button
            className={`control-btn ${sortOrder === 'reverse' ? 'active' : ''}`}
            onClick={() => handleSort('reverse')}
          >
            Newest First
          </button>
          <button
            className={`control-btn ${sortOrder === 'likes' ? 'active' : ''}`}
            onClick={() => handleSort('likes')}
          >
            Most Liked
          </button>
          <button
            className={`control-btn ${sortOrder === 'retweets' ? 'active' : ''}`}
            onClick={() => handleSort('retweets')}
          >
            Most Retweeted
          </button>
          <button
            className={`control-btn ${sortOrder === 'replies' ? 'active' : ''}`}
            onClick={() => handleSort('replies')}
          >
            Most Replies
          </button>
        </div>
        <div className="tweets">
          {sortedTweets.map((tweet, index) => (
            <div key={index} className="tweet">
              <div className="tweet-content">
                <div className="avatar" />
                <div className="tweet-body">
                  <div className="tweet-header">
                    <span className="username">ye</span>
                    <span className="handle">@kanyewest</span>
                    <span className="time">· {tweet.time}</span>
                  </div>
                  <p className="tweet-text">{tweet.content}</p>
                  <div className="tweet-stats">
                    <div className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                      </svg>
                      {tweet.impressions}
                    </div>
                    <div className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                      </svg>
                      {tweet.likes}
                    </div>
                    <div className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                      </svg>
                      {tweet.retweets}
                    </div>
                    <div className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
                      </svg>
                      {tweet.replies}
                    </div>
                    <div className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" />
                      </svg>
                      {tweet.bookmarks}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
