import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const PC = dynamic(import('../../component/about/pc'))
const H5 = dynamic(import('../../component/about/mobile'))
function About(props) {
  console.log(props, 'about render')
  return (
    <div>
      <h1>关于我们</h1>
      {props.pcFlag ? <PC /> : <H5 />}
    </div>
  )
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
  const { router, AppTree, ctx, Component } = props
  console.log(router, 'about')
  let pageProps = {
    test: 1,
  }

  return pageProps
}
export default About
