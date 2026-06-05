import { useCallback } from "react";

export const useGetToDoList = () => {
  const memoized = useCallback(
    () =>
      fetch("http://localhost:3002/api/todos/list").then((response) =>
        response.json()
      ),
    []
  );
  return memoized;
};
