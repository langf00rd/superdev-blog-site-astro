export const getPosts = (posts) => {
  const postsArray = [];

  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    postsArray.push(element.frontmatter);
  }

  const dateFilteredPosts = postsArray.sort(
    (a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate)
  );

  return dateFilteredPosts;
};
