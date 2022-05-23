import Head from 'next/head'
import Header from '../components/Header'
import { ReactNode } from 'react'
import Footer from '../components/Footer'
import { useUser } from '../components/userContext'

const Layout = (props: {
  pageTitle: string
  siteName: string
  description: string
  children: ReactNode
  preview: string
}) => {
  const { loggedIn } = useUser()
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="follow, index" />
        <title>{props.pageTitle}</title>
        <meta name="description" content="Shortify - URL shortener service" />
        <meta name="author" content="Mohamed Achaq" />
        <meta
          property="og:site_name"
          content={props.siteName}
          key="ogsitename"
        />
        <meta property="og:title" content={props.pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={props.description}
          key="ogdesc"
        />
        <meta
          name="keywords"
          content="Mohamed Achaq,Shortify, HTML, CSS, JavaScript, React, Typescript, NodeJs, Python"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shortify.achaq.codes/" />
        <meta property="og:title" content="Shortify - URL shortener servic" />
        <meta property="og:description" content="URL shortener servic" />
      </Head>
      <Header />
      {props.children}
      {!loggedIn && <Footer />}
    </>
  )
}
export default Layout
