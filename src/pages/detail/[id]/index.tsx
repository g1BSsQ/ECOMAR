import { useRouter } from 'next/router';
import React from 'react'
import { SellCredits } from '~/components/component/sellcredits';
export default function Detail(params) {
  return (
    <main>
      <SellCredits></SellCredits>
    </main>
  ) 
}