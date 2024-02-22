'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Homepage = () => {

  const router = useRouter()

  useEffect(() => {
    setTimeout(router.push('/login'),500);
    return;
  }, [])

  return (
    <div>Homepage</div>
  )
}

export default Homepage;