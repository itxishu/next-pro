import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  console.log(pageProps, 'pageProps')
  return <Component {...pageProps} />
}
MyApp.getInitialProps = async (props) => {
  let pageProps = {}
  if (props.Component.getInitialProps) {
    pageProps = await props.Component.getInitialProps(props)
  }
  console.log('===', '执行完毕', pageProps)
  return {
    pageProps,
  }
}

export default MyApp
