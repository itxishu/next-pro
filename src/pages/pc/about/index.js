import React, { useState, useEffect } from 'react';

function About(props) {
  console.log(props, 'about render')
  return <div>关于我们</div>;
}

// export const getServerSideProps = async () => {
//   const params = {
//     time: 'today', // weekly,today,monthly
//     type: 'repos' // developers,repos
//   };

//   const res = await getGithubRank(params);
//   let githubRank = [];
//   if (res.code === 0) {
//     githubRank = res.data;
//   }
//   return {
//     props: {
//       githubRankList: githubRank
//     }
//   };
// };
About.getInitialProps = async (props) => {
  console.log(props, 'about')
  let pageProps = {
    test: 1
  }

  return pageProps
}
export default About;
