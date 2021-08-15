import React, { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import Layout from '../../../components/pc/Layout';

import styles from './index.module.styl';

const { Option } = Select;
function About({ githubRankList }) {
  return <Layout>关于我们</Layout>;
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
