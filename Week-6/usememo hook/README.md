# useMemo Hook

The React useMemo Hook returns a memoized value.T
Think of memoization as caching a value so that it does not need to be recalculated.
The useMemo Hook only runs when one of its dependencies update.
This can improve performance.

`The useMemo and useCallback Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.`


```
as the count is useState variable when the count changes the whole page rerender again.so the expensive operation occure again. that is not efficient code.
To make this efficient use useMemo hook

  ```