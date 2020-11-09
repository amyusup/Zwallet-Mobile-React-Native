import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthLogout } from '../../../redux/actions/auth'

function Logout(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthLogout(props))
  }, [dispatch, props])

  return (
    <></>
  )
}

export default Logout
