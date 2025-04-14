package com.newpocapp

import android.app.Activity
import android.os.Bundle
import com.facebook.react.ReactRootView
import com.facebook.react.ReactInstanceManager
import com.facebook.react.PackageList
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.soloader.SoLoader

class CustomReactActivityDelegate(
    private val activity: Activity,
    private val moduleName: String?,
    private val bundleAssetName: String?
) {
    private var reactRootView: ReactRootView? = null
    private var reactInstanceManager: ReactInstanceManager? = null

    fun onCreate(savedInstanceState: Bundle?) {
        SoLoader.init(activity, false)

        reactRootView = ReactRootView(activity)

        val application = activity.application
        val packages: List<ReactPackage> = PackageList(
            object : ReactNativeHost(application) {
                override fun getUseDeveloperSupport(): Boolean = false
                override fun getPackages(): List<ReactPackage> = emptyList()
                override fun getJSMainModuleName(): String = "index"
            }
        ).packages

        android.util.Log.d("CustomReactActivityDelegate", "onCreate: $bundleAssetName")

        reactInstanceManager = ReactInstanceManager.builder()
            .setApplication(application)
            .setCurrentActivity(activity)
            .setJSBundleFile(bundleAssetName)
            .setJSMainModulePath("index")
            .addPackages(packages)
            .setUseDeveloperSupport(false)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build()
//            .setBundleAssetName(bundleAssetName ?: "index.android.bundle")

        reactRootView?.startReactApplication(
            reactInstanceManager,
            moduleName,
            null
        )

        activity.setContentView(reactRootView)
    }
}
