import {buffer, debounceTime, Observable, OperatorFunction} from "rxjs";

type BufferDebounce = <T>(debounce: number) => OperatorFunction<T, T[]>;

export const bufferDebounce: BufferDebounce = debounce => source =>
    new Observable(observer =>
        source.pipe(buffer(source.pipe(debounceTime(debounce)))).subscribe({
            next(x) {
                observer.next(x);
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
            },
        }),
    );
