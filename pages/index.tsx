import Head from 'next/head'
import SideBar from '../components/SideBar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className="overflow-hidden h-screen w-screen">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/icono.png" />
      </Head>

      <main className='flex w-screen h-screen'>
        {/* SideBar */}
        <SideBar/>
        {/* Container */}
        <Center/>
      </main>

      <div>
        {/* Player */}
      </div>

    </div>
  )
}

export async function getServerSideProps(context: Object){
  const session = await getSession(context);

  return{
    props:{
      session
    }
  }
}