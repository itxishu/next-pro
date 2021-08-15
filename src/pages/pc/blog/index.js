import React, { useState, useEffect } from 'react';

const { Option } = Select;
function About({ githubRankList }) {
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

export default About;
