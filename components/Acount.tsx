import User from './User'
import { Fragment, useEffect, useState } from 'react'
import { UrlContext } from './UrlContext'

type Props = {
  user: { email: string; iat: number; name: string; _id: string }
}

const Account = (props: Props) => {
  return <User name={props.user.name} email={props.user.email} />
}

export default Account
