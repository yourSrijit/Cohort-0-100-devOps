import { getServerSession } from 'next-auth';
import React from 'react'
import { NEXT_AUTH } from '../lib/auth';

async function user() {
    const session=await getServerSession(NEXT_AUTH);
  return (
    <div>
      User Component <br />
        {JSON.stringify(session)}

    </div>
  )
}

export default user