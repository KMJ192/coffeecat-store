import { ReactDOM } from '..';

const DiffingAlgorithm = (function () {
  function useDiff(
    prevDOM?: ReactDOM | ReactDOM[],
    nextDOM?: ReactDOM | ReactDOM[],
  ) {
    if (!nextDOM) return;

    // level by level 비교

    const prevIsArr = Array.isArray(prevDOM);
    const nextIsArr = Array.isArray(nextDOM);

    // 이전 DOM이 없음, 다음 DOM은 있음 -> 갱신 대상
    if (!prevDOM && nextDOM) {
      if (nextIsArr) {
        nextDOM.forEach((d: ReactDOM) => {
          d.dirty = true;
        });
      } else {
        nextDOM.dirty = true;
      }
      return;
    }

    // 이전 DOM은 배열이 아니고, 다음 DOM은 배열 -> 갱신 대상
    if (!prevIsArr && nextIsArr) {
      nextDOM.forEach((d: ReactDOM) => {
        d.dirty = true;
      });
      return;
    }

    // 이전 DOM은 배열 이고 다음 DOM은 배열이 아님 -> 갱신 대상
    if (prevIsArr && !nextIsArr) {
      nextDOM.dirty = true;
      return;
    }

    // 이전 DOM, 다음 DOM 모두 배열
    if (prevIsArr && nextIsArr) {
      const prevLen = prevDOM.length;
      const nextLen = nextDOM.length;
      if (prevLen === nextLen) {
        const prevStr = JSON.stringify(prevDOM);
        const nextStr = JSON.stringify(nextDOM);
        // 배열 내 이전 DOM, 다음 DOM 중 다른 요소가 있을 경우
        if (prevStr !== nextStr) {
          nextDOM.forEach((d: ReactDOM, idx: number) => {
            // 다른 요소가 있는 DOM -> 갱신 대상
            const next = JSON.stringify(d);
            const prev = JSON.stringify(prevDOM[idx]);
            if (next !== prev) {
              d.dirty = true;
            }
          });
        }
      } else {
        // 이전 DOM, 다음 DOM의 배열 길이가 다른 경우 -> 갱신 대상
        nextDOM.forEach((d: ReactDOM) => {
          d.dirty = true;
        });
      }
    }

    const prevStr = JSON.stringify(prevDOM);
    const nextStr = JSON.stringify(nextDOM);
    if (prevStr !== nextStr) {
      (nextDOM as ReactDOM).dirty = true;
    }
  }
  return {
    useDiff,
  };
})();

export const { useDiff } = DiffingAlgorithm;
export default DiffingAlgorithm;
