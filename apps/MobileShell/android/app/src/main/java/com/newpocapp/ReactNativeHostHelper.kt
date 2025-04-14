package com.newpocapp

import com.facebook.react.ReactNativeHost

object ReactNativeHostHelper {
    private var customHost: ReactNativeHost? = null

    fun setCustomReactNativeHost(host: ReactNativeHost) {
        customHost = host
    }

    fun getCustomReactNativeHost(): ReactNativeHost? = customHost
}
