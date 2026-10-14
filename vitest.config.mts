import {defineConfig} from 'vitest/config'
export default defineConfig({
  resolve:{tsconfigPaths:true},
  test:{environment:'node',include:['tests/int/**/*.int.spec.ts'],fileParallelism:true,testTimeout:30000},
})
