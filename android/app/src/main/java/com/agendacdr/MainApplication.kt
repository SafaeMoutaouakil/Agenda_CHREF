package com.agendacdr

import android.app.Application
import com.reactnativenavigation.NavigationApplication
import com.reactnativenavigation.react.NavigationReactNativeHost

class MainApplication : NavigationApplication() {

    override fun createReactNativeHost(): ReactNativeHost {
        return object : NavigationReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> {
                return PackageList(this).packages.apply {
                    // Ajoutez des packages supplémentaires ici, si nécessaire
                }
            }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }
    }

    override fun onCreate() {
        super.onCreate()
        // Initialisation spécifique si nécessaire
    }
}
