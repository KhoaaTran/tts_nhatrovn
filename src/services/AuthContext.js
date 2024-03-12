import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {axiosInstance} from './axiosInstance'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [isLoading, setLoading] = useState(false)
  const [isLogIn, setLogIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [splashLoading, setSplashLoading] = useState(false)
  const [errDesc, setErrDesc] = useState('')
  const [jwt, setJwt] = useState('')
  const [isCheckLoginComplete, setCheckLoginComplete] = useState(false)

  const execLogin = async (userName, password, deviceInfo) => {
    setLoading(true)

    return axiosInstance.call().request({
      url: '/auth/signin',
      method: 'POST',
      data: {
        user_name: userName,
        password: password,
        device_info: deviceInfo,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  const execLogout = async () => {
    try {
      setSplashLoading(true)
      let userInfo = await AsyncStorage.getItem('userInfo')
      let deviceIdForApp = await AsyncStorage.getItem('device_id_for_app')
      let objectUser = {}
      if (userInfo) {
        try {
          objectUser = JSON.parse(userInfo)
        } catch (e) {}
      }
      if (
        deviceIdForApp == null ||
        deviceIdForApp == undefined ||
        deviceIdForApp == ''
      ) {
        await AsyncStorage.removeItem('userInfo')
        setUserInfo(null)
        setLogIn(false)
        setSplashLoading(false)
      } else {
        await axiosInstance
          .call()
          .request({
            url: '/auth/logout',
            method: 'POST',
            data: {
              token: objectUser.token == null ? '' : objectUser.token,
              deviceIdForApp: deviceIdForApp,
            },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(function (res) {
            AsyncStorage.removeItem('userInfo')
            setUserInfo(null)
            setLogIn(false)
            setSplashLoading(false)
          })
          .catch(function (error) {
            AsyncStorage.removeItem('userInfo')
            setUserInfo(null)
            setLogIn(false)
            setSplashLoading(false)
          })
      }
    } catch (e) {}
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)
      setCheckLoginComplete(false)

      let deviceIdForApp = await AsyncStorage.getItem('device_id_for_app')
      let userInfo = await AsyncStorage.getItem('userInfo')
      let objectUser = {}
      if (userInfo) {
        try {
          objectUser = JSON.parse(userInfo)
        } catch (e) {}
      }

      await axiosInstance
        .call()
        .request({
          url: '/auth/check-token',
          method: 'POST',
          data: {
            refresh_token: objectUser?.refresh_token || '',
            deviceIdForApp: deviceIdForApp,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          let rsp = res.data
          if (rsp.status_code === 0) {
            setLogIn(true)
            setUserInfo(rsp)
            setJwt(rsp.token)
            AsyncStorage.setItem('userInfo', JSON.stringify(rsp))
            setCheckLoginComplete(true)
          } else {
            setLogIn(false)
            setUserInfo(null)
            setJwt('')
            setCheckLoginComplete(true)
          }
        })
        .catch(function (error) {
          setCheckLoginComplete(true)
        })

      setSplashLoading(false)
    } catch (e) {
      setSplashLoading(false)
      setCheckLoginComplete(true)
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      await isLoggedIn()
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoading,
        splashLoading,
        isLogIn,
        setLogIn,
        errDesc,
        userInfo,
        setUserInfo,
        execLogin,
        execLogout,
        isLoggedIn,
        jwt,
        setJwt,
        isCheckLoginComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
