import { getServerSession } from 'next-auth';
import React from 'react'

async function user() {
    const session=await getServerSession();
  return (
    <div>
      User Component <br />
        {JSON.stringify(session)}

    </div>
  )
}

export default user