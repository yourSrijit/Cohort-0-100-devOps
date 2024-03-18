# useCallback Hook
---
### The React useCallback Hook returns a memoized callback function.This allows us to isolate resource intensive functions so that they will not automatically run on every render The useCallback Hook only runs when one of its dependencies update.This can improve performance.
The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.