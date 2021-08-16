import '../styles/globals.css'
import { isPc } from '../utils'

function MyApp({ Component, pageProps, ctx }) {
  const isServer = typeof window === 'undefined'

  return <Component {...pageProps} isServer={isServer} />
}
MyApp.getInitialProps = async (props) => {
  const { ctx } = props
  const isServer = !!ctx.req && typeof window === 'undefined'

  const pcFlag = isServer ? isPc(ctx.req.headers['user-agent']) : isPc()
  let pageProps = {}
  if (props.Component.getInitialProps) {
    pageProps = await props.Component.getInitialProps(props)
  }
  return {
    pageProps: {
      ...pageProps,
      pcFlag,
      isServer,
    }
  }
}

export default MyApp
