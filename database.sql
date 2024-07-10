DROP TABLE IF EXISTS public.comments;

CREATE TABLE comments (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(55),
  content VARCHAR(500),
  parentId INTEGER REFERENCES comments(ID) ON DELETE CASCADE
);

INSERT INTO comments (email, content)
  VALUES ('jerry@example.com', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'), ('george@example.com', 'Ut enim ad minima veniam esse quam nihil molestiae consequatur');
  