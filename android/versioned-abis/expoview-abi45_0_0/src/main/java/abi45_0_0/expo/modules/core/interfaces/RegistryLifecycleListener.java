package abi45_0_0.expo.modules.core.interfaces;

import abi45_0_0.expo.modules.core.ModuleRegistry;

public interface RegistryLifecycleListener {

  default void onCreate(ModuleRegistry moduleRegistry) {
    // do nothing
  }

  default void onDestroy() {
    // do nothing
  }

}
