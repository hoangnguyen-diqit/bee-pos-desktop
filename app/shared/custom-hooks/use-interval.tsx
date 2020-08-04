import React from "react";

export function useInterval(callback, delay) {
    const savedCallback = React.useRef<any>(null);

    // Remember the latest function.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            if (!!savedCallback && savedCallback.current !== null) {
                savedCallback.current();
            }
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
