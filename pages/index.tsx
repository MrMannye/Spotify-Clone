import Head from 'next/head'
import SideBar from '../components/SideBar'

export default function Home() {
  return (
    <div className="overflow-hidden h-screen">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/icono.png" />
      </Head>

      <main className=''>
        {/* SideBar */}
        <SideBar/>
        {/* Container */}
      </main>

      <div>
        {/* Player */}
      </div>

    </div>
  )
}
