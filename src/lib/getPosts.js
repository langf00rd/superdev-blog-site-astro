const getPosts = (posts) => {
  const blosArray = [];

  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    blosArray.push(element.frontmatter);
  }

  return blosArray;
};

export default getPosts;
