package abi45_0_0.expo.modules.kotlin.functions

import abi45_0_0.expo.modules.kotlin.ModuleHolder
import abi45_0_0.expo.modules.kotlin.Promise
import abi45_0_0.expo.modules.kotlin.types.AnyType

class AsyncFunctionWithPromise(
  name: String,
  argsType: Array<AnyType>,
  private val body: (args: Array<out Any?>, promise: Promise) -> Unit
) : AnyFunction(name, argsType) {
  override fun callImplementation(holder: ModuleHolder, args: Array<out Any?>, promise: Promise) {
    body(args, promise)
  }
}
