import React from 'react';

function About(props) {
  return <div>你好，这是移动端！！！</div>;
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
  console.log(props.toString(), 'about')
  let pageProps = {
    test: 1
  }

  return pageProps
}
export default About;
