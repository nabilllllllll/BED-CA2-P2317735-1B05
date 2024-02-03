const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Yummy!", 2),  
  ("I am the one", 3);
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
