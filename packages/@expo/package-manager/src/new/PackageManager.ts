import { SpawnOptions, SpawnPromise, SpawnResult } from '@expo/spawn-async';

import { PendingSpawnPromise } from './utils/spawn';

export interface PackageManagerOptions extends SpawnOptions {
  logger?: (...args: any[]) => void;
  silent?: boolean;
}

export interface PackageManager {
  /** The options for this package manager */
  readonly options: PackageManagerOptions;

  /** Run any command using the package manager */
  runAsync(command: string[]): SpawnPromise<SpawnResult>;

  /** Get the version of the used package manager */
  versionAsync(): Promise<string>;
  /** Get a single configuration property from the package manager */
  configAsync(key: string): Promise<string>;
  /** Remove the lock file within the project, if any */
  removeLockFileAsync(): Promise<void>;
  /** Get the workspace root, if this project is within a workspace/monorepo */
  workspaceRootAsync(): Promise<string | null>;

  /** Install all current dependencies using the package manager */
  installAsync():
    | Promise<SpawnResult>
    | SpawnPromise<SpawnResult>
    | PendingSpawnPromise<SpawnResult>;
  /** Uninstall all current dependencies by removing the folder containing the packages */
  uninstallAsync(): Promise<void>;

  /** Add a normal dependency to the project */
  addAsync(namesOrFlags: string[]): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;
  /** Add a development dependency to the project */
  addDevAsync(namesOrFlags: string[]): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;
  /** Add a global dependency to the environment */
  addGlobalAsync(
    namesOrFlags: string[]
  ): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;

  /** Remove a normal dependency from the project */
  removeAsync(namesOrFlags: string[]): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;
  /** Remove a development dependency from the project */
  removeDevAsync(
    namesOrFlags: string[]
  ): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;
  /** Remove a global dependency from the environments */
  removeGlobalAsync(
    namesOrFlags: string[]
  ): SpawnPromise<SpawnResult> | PendingSpawnPromise<SpawnResult>;
}
