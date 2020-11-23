import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLogout } from '../../../redux/actions/auth'

function Logout(props) {
  const dispatch = useDispatch()
  const { userdata } = useSelector( state => state.User )
  

  useEffect(() => {
    const email = userdata.email
    dispatch(AuthLogout({email}))
  }, [dispatch, props])

  return (
    <></>
  )
}

export default Logout
