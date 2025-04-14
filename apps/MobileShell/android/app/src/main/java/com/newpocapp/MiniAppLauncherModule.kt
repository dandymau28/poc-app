package com.newpocapp

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MiniAppLauncherModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "MiniAppLauncher"

    @ReactMethod
    fun openMiniApp() {
        val context = reactApplicationContext.currentActivity ?: return
        val intent = Intent(context, MiniAppActivity::class.java).apply {
            putExtra("bundleAssetName", "main.bundle.js")
            putExtra("componentName", "homes")
        }
        context.startActivity(intent)
    }
}
