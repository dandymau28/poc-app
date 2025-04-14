package com.newpocapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import java.io.File
import android.util.Log

class MiniAppActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val moduleName = intent.getStringExtra("componentName")
        val bundleAssetFile = File(
            getExternalFilesDir(null),
            intent.getStringExtra("bundleAssetName")
        )

        val bundleAssetFileName = bundleAssetFile.absolutePath

        Log.d("MiniAppActivity", "onCreate() called with: savedInstanceState = $bundleAssetFileName, exists: ${bundleAssetFile.exists()}")

        val delegate = CustomReactActivityDelegate(
            this,
            moduleName,
            bundleAssetFileName
        )
        delegate.onCreate(savedInstanceState)
    }

    override fun onResume() {
        super.onResume()
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}
